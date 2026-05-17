# Inventa
# A-Z Inventory Management System - System Design

## Architecture Overview

This project uses a NestJS monorepo with one REST API gateway and five internal TCP microservices.

```
Client
  -> API Gateway
  -> Auth/Tenant Service
  -> User Service
  -> Party Service
  -> Inventory Service
  -> Sales Service
```

The API Gateway owns HTTP routing, request validation, JWT verification, and forwarding authenticated request context to internal services. Internal services expose NestJS TCP message handlers. Auth/user data is kept in a shared control database, while tenant-owned business data is stored in tenant-specific databases.

TCP transport is used first because it is simple for local development and officially supported by NestJS microservices. The boundaries are designed so the same message contracts can later move to Redis, NATS, RabbitMQ, Kafka, or gRPC.

## Service Responsibilities

### api-gateway

- Exposes REST APIs.
- Validates JWT for protected routes.
- Allows `x-tenant-id` only as a local development fallback when JWT is absent.
- Forwards `tenantId` and `userId` in request context.
- Calls microservices through `ClientProxy`.
- Uses RxJS `firstValueFrom` and request timeouts for microservice calls.

Routes:

- `POST /auth/register`
- `POST /auth/tenants`
- `POST /auth/login`
- `GET /users`
- `POST /users`
- `GET /customers`
- `POST /customers`
- `GET /suppliers`
- `POST /suppliers`
- `GET /products`
- `POST /products`
- `GET /warehouses`
- `POST /warehouses`
- `GET /stock-movements`
- `POST /stock-movements`
- `GET /sales`
- `POST /sales`
- `GET /invoices`
- `POST /invoices`
- `POST /payments`

### auth-tenant-service

- Registers a tenant/company admin.
- Provisions tenant-specific party, inventory, and sales databases for new clients.
- Logs users in.
- Hashes passwords with bcrypt.
- Signs JWT access tokens.
- Validates JWT payloads.
- Delegates user persistence to `user-service`.

Message patterns:

- `auth.register`
- `auth.createTenant`
- `auth.login`
- `auth.validate`

### user-service

- Manages users, employees, and roles.
- Owns the shared control-plane `User` table in `ims_users`.
- Remains shared so login can find a user before the system knows which tenant database to open.

Message patterns:

- `user.create`
- `user.findAll`
- `user.findById`
- `user.findByEmail`
- `user.update`
- `user.delete`

### party-service

- Manages customers and suppliers.
- Owns `Customer` and `Supplier` tables in one tenant database per tenant.
- Tenant party databases use the naming pattern `ims_party_tenant_<tenant_id_with_underscores>`.

Message patterns:

- `customer.create`
- `customer.findAll`
- `customer.findById`
- `customer.update`
- `customer.delete`
- `supplier.create`
- `supplier.findAll`
- `supplier.findById`
- `supplier.update`
- `supplier.delete`

### inventory-service

- Manages products, warehouses, stock, and stock movements.
- Owns `Product`, `Warehouse`, and `StockMovement` tables in one tenant database per tenant.
- Tenant inventory databases use the naming pattern `ims_inventory_tenant_<tenant_id_with_underscores>`.

Message patterns:

- `product.create`
- `product.findAll`
- `product.findById`
- `product.update`
- `product.delete`
- `warehouse.create`
- `warehouse.findAll`
- `warehouse.findById`
- `warehouse.update`
- `warehouse.delete`
- `stockMovement.create`
- `stockMovement.findAll`

### sales-service

- Manages sales, invoices, payments, and future returns.
- Owns `Sale`, `SaleItem`, `Invoice`, and `Payment` tables in one tenant database per tenant.
- Tenant sales databases use the naming pattern `ims_sales_tenant_<tenant_id_with_underscores>`.

Message patterns:

- `sale.create`
- `sale.findAll`
- `sale.findById`
- `invoice.create`
- `invoice.findAll`
- `invoice.findById`
- `payment.create`
- `payment.findAll`

## Request Flow

1. Client sends an HTTP request to the API Gateway.
2. Gateway validates request DTOs.
3. Gateway extracts `userId` and `tenantId` from JWT for protected routes.
4. Gateway forwards `{ context, data }` to the target microservice.
5. Microservice validates required context and uses `context.tenantId` to resolve the tenant database for tenant-owned business data.
6. Microservice returns a payload or throws `RpcException`.
7. Gateway converts the result to HTTP JSON through a response interceptor.

## Authentication Flow

### Register

1. Client calls `POST /auth/register` or `POST /auth/tenants`.
2. Gateway forwards registration data to `auth-tenant-service`.
3. Auth service generates a tenant UUID, hashes the password with bcrypt, and calls `user-service` with role `ADMIN`.
4. User service persists the admin user under that tenant in the shared `ims_users` control database.
5. Auth service creates the tenant-specific party, inventory, and sales databases.
6. Auth service signs a JWT containing `sub`, `tenantId`, `email`, and `role`.

### Login

1. Client calls `POST /auth/login`.
2. Auth service looks up the user by email through `user-service`.
3. Auth service compares the password with bcrypt.
4. Auth service signs a JWT when credentials are valid.

Protected routes use `Authorization: Bearer <token>`.

## Tenant Strategy

- The system now uses a hybrid database-per-tenant model.
- `ims_users` stays shared as the control/auth database.
- Party, inventory, and sales data are stored in tenant-specific PostgreSQL databases.
- Tenant-owned tables still include `tenantId` as a defensive ownership column and for easier exports/audits.
- The API Gateway never trusts `tenantId` from request bodies.
- The API Gateway reads `tenantId` from JWT claims.
- `x-tenant-id` is allowed only as a local development fallback.
- Services must use `context.tenantId` to select the tenant database.
- UUIDs are used for primary keys and tenant identifiers.

This design gives stronger data isolation than row-level multi-tenancy while keeping authentication practical. A fully separate auth database per tenant would require a tenant registry or login domain/subdomain resolver before login.

## Database Strategy

The system has one shared control database and tenant-specific business databases:

- `user-service`: shared `ims_users`
- `party-service`: `ims_party_tenant_<tenant_id_with_underscores>`
- `inventory-service`: `ims_inventory_tenant_<tenant_id_with_underscores>`
- `sales-service`: `ims_sales_tenant_<tenant_id_with_underscores>`

`user-service` uses normal `TypeOrmModule` configuration because login needs a shared user lookup. Party, inventory, and sales services use `TenantDataSourceManager`, which creates/opens the tenant database at request time based on `context.tenantId`.

For local development, `DB_SYNCHRONIZE=true` allows TypeORM to create tenant tables automatically when a tenant database is first opened. Production should use explicit migrations instead of `synchronize=true`.

## Message Patterns

Patterns are string constants exported from `libs/common/src/constants/patterns.ts`. Services receive a standard payload:

```ts
{
  context: {
    tenantId: string;
    userId?: string;
  },
  data: object;
}
```

## Folder Structure

```
apps/
  api-gateway/
  auth-tenant-service/
  user-service/
  party-service/
  inventory-service/
  sales-service/
libs/
  common/
    src/
      constants/
      dto/
      entities/
      decorators/
      guards/
      filters/
      interceptors/
      interfaces/
```

## Environment Variables

```env
API_GATEWAY_PORT=3000
JWT_SECRET=change_me
DB_SYNCHRONIZE=true
POSTGRES_MAINTENANCE_DB=postgres

AUTH_SERVICE_HOST=localhost
AUTH_SERVICE_PORT=3001

USER_SERVICE_HOST=localhost
USER_SERVICE_PORT=3002
USER_DB_HOST=localhost
USER_DB_PORT=5432
USER_DB_USER=postgres
USER_DB_PASS=postgres
USER_DB_NAME=ims_users

PARTY_SERVICE_HOST=localhost
PARTY_SERVICE_PORT=3003
PARTY_DB_HOST=localhost
PARTY_DB_PORT=5432
PARTY_DB_USER=postgres
PARTY_DB_PASS=postgres
PARTY_DB_NAME=ims_parties
PARTY_TENANT_DB_PREFIX=ims_party_tenant

INVENTORY_SERVICE_HOST=localhost
INVENTORY_SERVICE_PORT=3004
INVENTORY_DB_HOST=localhost
INVENTORY_DB_PORT=5432
INVENTORY_DB_USER=postgres
INVENTORY_DB_PASS=postgres
INVENTORY_DB_NAME=ims_inventory
INVENTORY_TENANT_DB_PREFIX=ims_inventory_tenant

SALES_SERVICE_HOST=localhost
SALES_SERVICE_PORT=3005
SALES_DB_HOST=localhost
SALES_DB_PORT=5432
SALES_DB_USER=postgres
SALES_DB_PASS=postgres
SALES_DB_NAME=ims_sales
SALES_TENANT_DB_PREFIX=ims_sales_tenant
```

## Local Ports

- API Gateway HTTP: `3000`
- Auth/Tenant Service TCP: `3001`
- User Service TCP: `3002`
- Party Service TCP: `3003`
- Inventory Service TCP: `3004`
- Sales Service TCP: `3005`
- PostgreSQL: `5432`

## Migration Strategy

- Use `DB_SYNCHRONIZE=true` only for local development.
- Keep `synchronize=false` in production and staging.
- Generate migrations per service database shape.
- Store migrations under the owning service, for example `apps/user-service/src/migrations`.
- Run migrations against every tenant database during deployment before starting the corresponding service.
- Avoid cross-service foreign keys. Use UUID references and validate through service calls or domain workflows.

Recommended future scripts:

- `migration:generate:user`
- `migration:run:user`
- `migration:generate:party`
- `migration:run:party`
- `migration:generate:inventory`
- `migration:run:inventory`
- `migration:generate:sales`
- `migration:run:sales`

## Future Scaling Plan

- Replace TCP with NATS, RabbitMQ, Kafka, or gRPC when service traffic grows.
- Add API Gateway rate limiting and request tracing.
- Add service-to-service auth for internal calls.
- Introduce an outbox pattern for stock and sales events.
- Split `party-service` into `customer-service` and `supplier-service` if business rules diverge.
- Split `inventory-service` into catalog, warehouse, and stock ledger services when needed.
- Split `sales-service` into quotation, order, invoice, payment, and return services when transaction volume grows.
- Add read models for reporting and dashboards.
- Add centralized observability: logs, metrics, traces, and correlation IDs.
