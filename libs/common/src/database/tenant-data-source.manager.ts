import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { Client } from 'pg';
import { DataSource } from 'typeorm';

type TenantDatabaseOptions = {
  tenantId: string;
  databasePrefix: string;
  host: string;
  port: number;
  username: string;
  password: string;
  maintenanceDatabase?: string;
  entities: Function[];
  synchronize: boolean;
  migrations?: string[];
};

@Injectable()
export class TenantDataSourceManager implements OnModuleDestroy {
  private readonly dataSources = new Map<string, DataSource>();

  async getDataSource(options: TenantDatabaseOptions): Promise<DataSource> {
    const database = this.buildDatabaseName(options.databasePrefix, options.tenantId);
    const cacheKey = `${options.host}:${options.port}:${database}`;
    const cached = this.dataSources.get(cacheKey);

    if (cached?.isInitialized) {
      return cached;
    }

    await this.ensureDatabaseExists(database, options);

    const dataSource = new DataSource({
      type: 'postgres',
      host: options.host,
      port: options.port,
      username: options.username,
      password: options.password,
      database,
      entities: options.entities,
      synchronize: options.synchronize,
      migrations: options.migrations,
    });

    await dataSource.initialize();
    this.dataSources.set(cacheKey, dataSource);
    return dataSource;
  }

  async onModuleDestroy() {
    await Promise.all(
      Array.from(this.dataSources.values()).map((dataSource) =>
        dataSource.isInitialized ? dataSource.destroy() : Promise.resolve(),
      ),
    );
  }

  private buildDatabaseName(prefix: string, tenantId: string): string {
    const normalizedTenantId = tenantId.replace(/-/g, '_').toLowerCase();
    const database = `${prefix}_${normalizedTenantId}`;

    if (!/^[a-z0-9_]+$/.test(database)) {
      throw new Error(`Unsafe tenant database name: ${database}`);
    }

    return database;
  }

  private async ensureDatabaseExists(
    database: string,
    options: TenantDatabaseOptions,
  ) {
    const client = new Client({
      host: options.host,
      port: options.port,
      user: options.username,
      password: options.password,
      database: options.maintenanceDatabase ?? 'postgres',
    });

    await client.connect();
    try {
      const exists = await client.query(
        'SELECT 1 FROM pg_database WHERE datname = $1',
        [database],
      );

      if (exists.rowCount === 0) {
        await client.query(`CREATE DATABASE "${database}"`);
      }
    } finally {
      await client.end();
    }
  }
}
