import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { ensurePostgresDatabase } from './ensure-postgres-database';

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

    await ensurePostgresDatabase({
      host: options.host,
      port: options.port,
      username: options.username,
      password: options.password,
      database,
      maintenanceDatabase: options.maintenanceDatabase,
    });

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

}
