import { randomUUID } from 'crypto';
import { config as loadEnv } from 'dotenv';
import { Client } from 'pg';

loadEnv();

type CliOptions = {
  tenantId?: string;
  count: number;
  batchSize: number;
};

function getOption(name: string): string | undefined {
  const prefix = `--${name}=`;
  return process.argv.find((arg) => arg.startsWith(prefix))?.slice(prefix.length);
}

function getOptions(): CliOptions {
  return {
    tenantId: getOption('tenant-id'),
    count: Number(getOption('count') ?? 100000),
    batchSize: Number(getOption('batch-size') ?? 1000),
  };
}

function requireTenantId(tenantId?: string): string {
  if (!tenantId) {
    throw new Error(
      'Missing --tenant-id. Example: npm run seed:products -- --tenant-id=YOUR_TENANT_ID',
    );
  }
  return tenantId;
}

function tenantDatabaseName(prefix: string, tenantId: string): string {
  const database = `${prefix}_${tenantId.replace(/-/g, '_').toLowerCase()}`;
  if (!/^[a-z0-9_]+$/.test(database)) {
    throw new Error(`Unsafe tenant database name: ${database}`);
  }
  return database;
}

async function main() {
  const options = getOptions();
  const tenantId = requireTenantId(options.tenantId);
  const host = process.env.INVENTORY_DB_HOST ?? 'localhost';
  const port = Number(process.env.INVENTORY_DB_PORT ?? 5432);
  const user = process.env.INVENTORY_DB_USER ?? 'postgres';
  const password = process.env.INVENTORY_DB_PASS ?? 'postgres';
  const database = tenantDatabaseName(
    process.env.INVENTORY_TENANT_DB_PREFIX ?? 'ims_inventory_tenant',
    tenantId,
  );

  await ensureDatabaseExists({ host, port, user, password, database });

  const client = new Client({
    host,
    port,
    user,
    password,
    database,
  });

  await client.connect();
  await ensureProductsTable(client);

  let inserted = 0;
  for (let start = 1; start <= options.count; start += options.batchSize) {
    const size = Math.min(options.batchSize, options.count - start + 1);
    const values: unknown[] = [];
    const placeholders: string[] = [];
    const now = new Date();

    for (let offset = 0; offset < size; offset += 1) {
      const index = start + offset;
      const paramStart = values.length + 1;
      placeholders.push(
        `($${paramStart}, $${paramStart + 1}, $${paramStart + 2}, $${paramStart + 3}, $${paramStart + 4}, $${paramStart + 5}, $${paramStart + 6}, $${paramStart + 7}, $${paramStart + 8}, $${paramStart + 9}, $${paramStart + 10}, $${paramStart + 11}, $${paramStart + 12})`,
      );
      values.push(
        randomUUID(),
        now,
        now,
        tenantId,
        `Seed Product ${index}`,
        `SEED-SKU-${String(index).padStart(6, '0')}`,
        `880000${String(index).padStart(7, '0')}`,
        `Seed Category ${((index - 1) % 20) + 1}`,
        `Seed Brand ${((index - 1) % 10) + 1}`,
        50 + (index % 500),
        75 + (index % 700),
        index % 200,
        true,
      );
    }

    const result = await client.query(
      `
        INSERT INTO products (
          "id",
          "createdAt",
          "updatedAt",
          "tenantId",
          "name",
          "sku",
          "barcode",
          "category",
          "brand",
          "purchasePrice",
          "salePrice",
          "stockQuantity",
          "isActive"
        )
        VALUES ${placeholders.join(', ')}
        ON CONFLICT ("tenantId", "sku") DO NOTHING
      `,
      values,
    );

    inserted += result.rowCount ?? 0;
    console.log(`Processed ${Math.min(start + size - 1, options.count)} / ${options.count}`);
  }

  await client.end();
  console.log(`Done. Inserted ${inserted} products for tenant ${tenantId}.`);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});

async function ensureDatabaseExists(options: {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
}) {
  const client = new Client({
    host: options.host,
    port: options.port,
    user: options.user,
    password: options.password,
    database: process.env.POSTGRES_MAINTENANCE_DB ?? 'postgres',
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

async function ensureProductsTable(client: Client) {
  await client.query(`
    CREATE TABLE IF NOT EXISTS products (
      "id" uuid PRIMARY KEY,
      "createdAt" timestamp NOT NULL DEFAULT now(),
      "updatedAt" timestamp NOT NULL DEFAULT now(),
      "tenantId" uuid NOT NULL,
      "name" varchar NOT NULL,
      "sku" varchar NOT NULL,
      "barcode" varchar,
      "category" varchar,
      "brand" varchar,
      "purchasePrice" numeric(14, 2) NOT NULL DEFAULT 0,
      "salePrice" numeric(14, 2) NOT NULL DEFAULT 0,
      "stockQuantity" numeric(14, 2) NOT NULL DEFAULT 0,
      "isActive" boolean NOT NULL DEFAULT true
    )
  `);

  await client.query(`
    CREATE UNIQUE INDEX IF NOT EXISTS "IDX_products_tenant_sku"
    ON products ("tenantId", "sku")
  `);
}
