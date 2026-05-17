import { Client } from 'pg';

export type EnsurePostgresDatabaseOptions = {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  maintenanceDatabase?: string;
};

export async function ensurePostgresDatabase(
  options: EnsurePostgresDatabaseOptions,
) {
  if (!/^[a-zA-Z0-9_-]+$/.test(options.database)) {
    throw new Error(`Unsafe database name: ${options.database}`);
  }

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
      [options.database],
    );

    if (exists.rowCount === 0) {
      await client.query(`CREATE DATABASE "${options.database}"`);
    }
  } finally {
    await client.end();
  }
}
