/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),
/* 2 */
/***/ ((module) => {

module.exports = require("@nestjs/config");

/***/ }),
/* 3 */
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),
/* 4 */
/***/ ((module) => {

module.exports = require("@nestjs/microservices");

/***/ }),
/* 5 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const common_1 = __webpack_require__(1);
const config_1 = __webpack_require__(2);
const sales_module_1 = __webpack_require__(6);
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            sales_module_1.SalesModule,
        ],
    })
], AppModule);


/***/ }),
/* 6 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SalesModule = void 0;
const common_1 = __webpack_require__(1);
const common_2 = __webpack_require__(7);
const invoices_controller_1 = __webpack_require__(26);
const payments_controller_1 = __webpack_require__(32);
const sales_controller_1 = __webpack_require__(33);
const sales_service_1 = __webpack_require__(27);
let SalesModule = class SalesModule {
};
exports.SalesModule = SalesModule;
exports.SalesModule = SalesModule = __decorate([
    (0, common_1.Module)({
        controllers: [sales_controller_1.SalesController, invoices_controller_1.InvoicesController, payments_controller_1.PaymentsController],
        providers: [sales_service_1.SalesService, common_2.TenantDataSourceManager],
    })
], SalesModule);


/***/ }),
/* 7 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(8), exports);
__exportStar(__webpack_require__(9), exports);
__exportStar(__webpack_require__(10), exports);
__exportStar(__webpack_require__(11), exports);
__exportStar(__webpack_require__(12), exports);
__exportStar(__webpack_require__(14), exports);
__exportStar(__webpack_require__(16), exports);
__exportStar(__webpack_require__(18), exports);
__exportStar(__webpack_require__(19), exports);
__exportStar(__webpack_require__(20), exports);
__exportStar(__webpack_require__(21), exports);
__exportStar(__webpack_require__(23), exports);
__exportStar(__webpack_require__(25), exports);


/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SERVICES = void 0;
exports.SERVICES = {
    AUTH: 'AUTH_SERVICE',
    USER: 'USER_SERVICE',
    PARTY: 'PARTY_SERVICE',
    INVENTORY: 'INVENTORY_SERVICE',
    SALES: 'SALES_SERVICE',
};


/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PATTERNS = void 0;
exports.PATTERNS = {
    AUTH_REGISTER: 'auth.register',
    AUTH_CREATE_TENANT: 'auth.createTenant',
    AUTH_LOGIN: 'auth.login',
    AUTH_VALIDATE: 'auth.validate',
    USER_CREATE: 'user.create',
    USER_FIND_ALL: 'user.findAll',
    USER_FIND_BY_ID: 'user.findById',
    USER_FIND_BY_EMAIL: 'user.findByEmail',
    USER_UPDATE: 'user.update',
    USER_DELETE: 'user.delete',
    CUSTOMER_CREATE: 'customer.create',
    CUSTOMER_FIND_ALL: 'customer.findAll',
    CUSTOMER_FIND_BY_ID: 'customer.findById',
    CUSTOMER_UPDATE: 'customer.update',
    CUSTOMER_DELETE: 'customer.delete',
    SUPPLIER_CREATE: 'supplier.create',
    SUPPLIER_FIND_ALL: 'supplier.findAll',
    SUPPLIER_FIND_BY_ID: 'supplier.findById',
    SUPPLIER_UPDATE: 'supplier.update',
    SUPPLIER_DELETE: 'supplier.delete',
    PRODUCT_CREATE: 'product.create',
    PRODUCT_FIND_ALL: 'product.findAll',
    PRODUCT_FIND_BY_ID: 'product.findById',
    PRODUCT_FIND_BY_SKU: 'product.findBySku',
    PRODUCT_UPDATE: 'product.update',
    PRODUCT_UPDATE_BY_SKU: 'product.updateBySku',
    PRODUCT_DELETE: 'product.delete',
    PRODUCT_DELETE_BY_SKU: 'product.deleteBySku',
    WAREHOUSE_CREATE: 'warehouse.create',
    WAREHOUSE_FIND_ALL: 'warehouse.findAll',
    WAREHOUSE_FIND_BY_ID: 'warehouse.findById',
    WAREHOUSE_UPDATE: 'warehouse.update',
    WAREHOUSE_DELETE: 'warehouse.delete',
    STOCK_MOVEMENT_CREATE: 'stockMovement.create',
    STOCK_MOVEMENT_FIND_ALL: 'stockMovement.findAll',
    SALE_CREATE: 'sale.create',
    SALE_FIND_ALL: 'sale.findAll',
    SALE_FIND_BY_ID: 'sale.findById',
    INVOICE_CREATE: 'invoice.create',
    INVOICE_FIND_ALL: 'invoice.findAll',
    INVOICE_FIND_BY_ID: 'invoice.findById',
    PAYMENT_CREATE: 'payment.create',
    PAYMENT_FIND_ALL: 'payment.findAll',
};


/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CurrentUser = void 0;
const common_1 = __webpack_require__(1);
exports.CurrentUser = (0, common_1.createParamDecorator)((_data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
});


/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TenantId = void 0;
const common_1 = __webpack_require__(1);
exports.TenantId = (0, common_1.createParamDecorator)((_data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user?.tenantId ?? request.headers['x-tenant-id'];
});


/***/ }),
/* 12 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RequestContextDto = void 0;
const class_validator_1 = __webpack_require__(13);
class RequestContextDto {
}
exports.RequestContextDto = RequestContextDto;
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], RequestContextDto.prototype, "tenantId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], RequestContextDto.prototype, "userId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RequestContextDto.prototype, "role", void 0);


/***/ }),
/* 13 */
/***/ ((module) => {

module.exports = require("class-validator");

/***/ }),
/* 14 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ensurePostgresDatabase = ensurePostgresDatabase;
const pg_1 = __webpack_require__(15);
async function ensurePostgresDatabase(options) {
    if (!/^[a-zA-Z0-9_-]+$/.test(options.database)) {
        throw new Error(`Unsafe database name: ${options.database}`);
    }
    const client = new pg_1.Client({
        host: options.host,
        port: options.port,
        user: options.username,
        password: options.password,
        database: options.maintenanceDatabase ?? 'postgres',
    });
    await client.connect();
    try {
        const exists = await client.query('SELECT 1 FROM pg_database WHERE datname = $1', [options.database]);
        if (exists.rowCount === 0) {
            await client.query(`CREATE DATABASE "${options.database}"`);
        }
    }
    finally {
        await client.end();
    }
}


/***/ }),
/* 15 */
/***/ ((module) => {

module.exports = require("pg");

/***/ }),
/* 16 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TenantDataSourceManager = void 0;
const common_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(17);
const ensure_postgres_database_1 = __webpack_require__(14);
let TenantDataSourceManager = class TenantDataSourceManager {
    constructor() {
        this.dataSources = new Map();
    }
    async getDataSource(options) {
        const database = this.buildDatabaseName(options.databasePrefix, options.tenantId);
        const cacheKey = `${options.host}:${options.port}:${database}`;
        const cached = this.dataSources.get(cacheKey);
        if (cached?.isInitialized) {
            return cached;
        }
        await (0, ensure_postgres_database_1.ensurePostgresDatabase)({
            host: options.host,
            port: options.port,
            username: options.username,
            password: options.password,
            database,
            maintenanceDatabase: options.maintenanceDatabase,
        });
        const dataSource = new typeorm_1.DataSource({
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
        await Promise.all(Array.from(this.dataSources.values()).map((dataSource) => dataSource.isInitialized ? dataSource.destroy() : Promise.resolve()));
    }
    buildDatabaseName(prefix, tenantId) {
        const normalizedTenantId = tenantId.replace(/-/g, '_').toLowerCase();
        const database = `${prefix}_${normalizedTenantId}`;
        if (!/^[a-z0-9_]+$/.test(database)) {
            throw new Error(`Unsafe tenant database name: ${database}`);
        }
        return database;
    }
};
exports.TenantDataSourceManager = TenantDataSourceManager;
exports.TenantDataSourceManager = TenantDataSourceManager = __decorate([
    (0, common_1.Injectable)()
], TenantDataSourceManager);


/***/ }),
/* 17 */
/***/ ((module) => {

module.exports = require("typeorm");

/***/ }),
/* 18 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BaseEntity = void 0;
const typeorm_1 = __webpack_require__(17);
class BaseEntity {
}
exports.BaseEntity = BaseEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], BaseEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], BaseEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], BaseEntity.prototype, "updatedAt", void 0);


/***/ }),
/* 19 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TenantBaseEntity = void 0;
const typeorm_1 = __webpack_require__(17);
const base_entity_1 = __webpack_require__(18);
class TenantBaseEntity extends base_entity_1.BaseEntity {
}
exports.TenantBaseEntity = TenantBaseEntity;
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ type: 'uuid' }),
    __metadata("design:type", String)
], TenantBaseEntity.prototype, "tenantId", void 0);


/***/ }),
/* 20 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HttpExceptionFilter = void 0;
const common_1 = __webpack_require__(1);
let HttpExceptionFilter = class HttpExceptionFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const status = exception instanceof common_1.HttpException
            ? exception.getStatus()
            : common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        const body = exception instanceof common_1.HttpException
            ? exception.getResponse()
            : { message: 'Internal server error' };
        response.status(status).send({
            success: false,
            error: body,
            timestamp: new Date().toISOString(),
        });
    }
};
exports.HttpExceptionFilter = HttpExceptionFilter;
exports.HttpExceptionFilter = HttpExceptionFilter = __decorate([
    (0, common_1.Catch)()
], HttpExceptionFilter);


/***/ }),
/* 21 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtAuthGuard = void 0;
const common_1 = __webpack_require__(1);
const jwt_1 = __webpack_require__(22);
let JwtAuthGuard = class JwtAuthGuard {
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const token = this.extractToken(request);
        if (token) {
            try {
                request.user = this.jwtService.verify(token);
                return true;
            }
            catch {
                throw new common_1.UnauthorizedException('Invalid or expired token');
            }
        }
        const tenantId = request.headers['x-tenant-id'];
        if (process.env.NODE_ENV !== 'production' && typeof tenantId === 'string') {
            request.user = {
                sub: '00000000-0000-0000-0000-000000000000',
                tenantId,
                email: 'local-dev@example.com',
                role: 'LOCAL_DEV',
            };
            return true;
        }
        throw new common_1.UnauthorizedException('Missing bearer token');
    }
    extractToken(request) {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
};
exports.JwtAuthGuard = JwtAuthGuard;
exports.JwtAuthGuard = JwtAuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _a : Object])
], JwtAuthGuard);


/***/ }),
/* 22 */
/***/ ((module) => {

module.exports = require("@nestjs/jwt");

/***/ }),
/* 23 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ResponseInterceptor = void 0;
const common_1 = __webpack_require__(1);
const rxjs_1 = __webpack_require__(24);
let ResponseInterceptor = class ResponseInterceptor {
    intercept(_context, next) {
        return next.handle().pipe((0, rxjs_1.map)((data) => ({ success: true, data })));
    }
};
exports.ResponseInterceptor = ResponseInterceptor;
exports.ResponseInterceptor = ResponseInterceptor = __decorate([
    (0, common_1.Injectable)()
], ResponseInterceptor);


/***/ }),
/* 24 */
/***/ ((module) => {

module.exports = require("rxjs");

/***/ }),
/* 25 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 26 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InvoicesController = void 0;
const common_1 = __webpack_require__(1);
const microservices_1 = __webpack_require__(4);
const common_2 = __webpack_require__(7);
const sales_service_1 = __webpack_require__(27);
let InvoicesController = class InvoicesController {
    constructor(service) {
        this.service = service;
    }
    create(payload) {
        return this.service.createInvoice(payload.context, payload.data);
    }
    findAll(payload) {
        return this.service.findInvoices(payload.context);
    }
    findById(payload) {
        return this.service.findInvoiceById(payload.context, payload.data.id);
    }
};
exports.InvoicesController = InvoicesController;
__decorate([
    (0, microservices_1.MessagePattern)(common_2.PATTERNS.INVOICE_CREATE),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof common_2.MicroservicePayload !== "undefined" && common_2.MicroservicePayload) === "function" ? _b : Object]),
    __metadata("design:returntype", void 0)
], InvoicesController.prototype, "create", null);
__decorate([
    (0, microservices_1.MessagePattern)(common_2.PATTERNS.INVOICE_FIND_ALL),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof common_2.MicroservicePayload !== "undefined" && common_2.MicroservicePayload) === "function" ? _c : Object]),
    __metadata("design:returntype", void 0)
], InvoicesController.prototype, "findAll", null);
__decorate([
    (0, microservices_1.MessagePattern)(common_2.PATTERNS.INVOICE_FIND_BY_ID),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof common_2.MicroservicePayload !== "undefined" && common_2.MicroservicePayload) === "function" ? _d : Object]),
    __metadata("design:returntype", void 0)
], InvoicesController.prototype, "findById", null);
exports.InvoicesController = InvoicesController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof sales_service_1.SalesService !== "undefined" && sales_service_1.SalesService) === "function" ? _a : Object])
], InvoicesController);


/***/ }),
/* 27 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SalesService = void 0;
const common_1 = __webpack_require__(1);
const config_1 = __webpack_require__(2);
const microservices_1 = __webpack_require__(4);
const common_2 = __webpack_require__(7);
const invoice_entity_1 = __webpack_require__(28);
const payment_entity_1 = __webpack_require__(29);
const sale_item_entity_1 = __webpack_require__(30);
const sale_entity_1 = __webpack_require__(31);
let SalesService = class SalesService {
    constructor(config, tenantDataSources) {
        this.config = config;
        this.tenantDataSources = tenantDataSources;
    }
    async createSale(context, dto) {
        const { tenantId, salesRepository, saleItemsRepository, } = await this.repositories(context);
        const totalAmount = dto.items.reduce((sum, item) => sum + Number(item.quantity) * Number(item.unitPrice), 0);
        const discountAmount = dto.discountAmount ?? 0;
        const taxAmount = dto.taxAmount ?? 0;
        const grandTotal = totalAmount - discountAmount + taxAmount;
        const sale = await salesRepository.save(salesRepository.create({
            tenantId,
            customerId: dto.customerId,
            saleNumber: dto.saleNumber ?? `SALE-${Date.now()}`,
            status: dto.status ?? 'DRAFT',
            totalAmount,
            discountAmount,
            taxAmount,
            grandTotal,
        }));
        const items = dto.items.map((item) => saleItemsRepository.create({
            tenantId,
            saleId: sale.id,
            productId: item.productId,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            totalPrice: Number(item.quantity) * Number(item.unitPrice),
        }));
        await saleItemsRepository.save(items);
        return this.findSaleById(context, sale.id);
    }
    async findSales(context) {
        const { tenantId, salesRepository } = await this.repositories(context);
        return salesRepository.find({
            where: { tenantId },
            relations: { items: true },
            order: { createdAt: 'DESC' },
        });
    }
    async findSaleById(context, id) {
        const { tenantId, salesRepository } = await this.repositories(context);
        const sale = await salesRepository.findOne({
            where: { id, tenantId },
            relations: { items: true },
        });
        if (!sale) {
            throw new microservices_1.RpcException('Sale not found');
        }
        return sale;
    }
    async createInvoice(context, dto) {
        const { tenantId, invoicesRepository } = await this.repositories(context);
        const sale = await this.findSaleById(context, dto.saleId);
        const invoice = invoicesRepository.create({
            tenantId,
            saleId: dto.saleId,
            invoiceNumber: dto.invoiceNumber,
            totalAmount: sale.grandTotal,
            paidAmount: 0,
            dueAmount: sale.grandTotal,
            status: 'UNPAID',
        });
        return invoicesRepository.save(invoice);
    }
    async findInvoices(context) {
        const { tenantId, invoicesRepository } = await this.repositories(context);
        return invoicesRepository.find({
            where: { tenantId },
            order: { createdAt: 'DESC' },
        });
    }
    async findInvoiceById(context, id) {
        const { tenantId, invoicesRepository } = await this.repositories(context);
        const invoice = await invoicesRepository.findOne({
            where: { id, tenantId },
        });
        if (!invoice) {
            throw new microservices_1.RpcException('Invoice not found');
        }
        return invoice;
    }
    async createPayment(context, dto) {
        const { tenantId, paymentsRepository, invoicesRepository } = await this.repositories(context);
        const invoice = await this.findInvoiceById(context, dto.invoiceId);
        const payment = await paymentsRepository.save(paymentsRepository.create({
            tenantId,
            invoiceId: dto.invoiceId,
            amount: dto.amount,
            paymentMethod: dto.paymentMethod,
            paymentDate: dto.paymentDate ? new Date(dto.paymentDate) : new Date(),
            note: dto.note,
        }));
        invoice.paidAmount = Number(invoice.paidAmount) + Number(dto.amount);
        invoice.dueAmount = Math.max(Number(invoice.totalAmount) - Number(invoice.paidAmount), 0);
        invoice.status = invoice.dueAmount <= 0 ? 'PAID' : 'PARTIAL';
        await invoicesRepository.save(invoice);
        return payment;
    }
    async findPayments(context) {
        const { tenantId, paymentsRepository } = await this.repositories(context);
        return paymentsRepository.find({
            where: { tenantId },
            order: { createdAt: 'DESC' },
        });
    }
    requireTenant(context) {
        if (!context?.tenantId) {
            throw new microservices_1.RpcException('tenantId is required');
        }
        return context.tenantId;
    }
    async repositories(context) {
        const tenantId = this.requireTenant(context);
        const dataSource = await this.tenantDataSources.getDataSource({
            tenantId,
            databasePrefix: this.config.get('SALES_TENANT_DB_PREFIX', 'ims_sales_tenant'),
            host: this.config.get('SALES_DB_HOST', 'localhost'),
            port: this.config.get('SALES_DB_PORT', 5432),
            username: this.config.get('SALES_DB_USER', 'postgres'),
            password: this.config.get('SALES_DB_PASS', 'postgres'),
            maintenanceDatabase: this.config.get('POSTGRES_MAINTENANCE_DB', 'postgres'),
            entities: [sale_entity_1.Sale, sale_item_entity_1.SaleItem, invoice_entity_1.Invoice, payment_entity_1.Payment],
            synchronize: this.config.get('DB_SYNCHRONIZE') === 'true',
            migrations: ['dist/apps/sales-service/migrations/*.js'],
        });
        return {
            tenantId,
            salesRepository: dataSource.getRepository(sale_entity_1.Sale),
            saleItemsRepository: dataSource.getRepository(sale_item_entity_1.SaleItem),
            invoicesRepository: dataSource.getRepository(invoice_entity_1.Invoice),
            paymentsRepository: dataSource.getRepository(payment_entity_1.Payment),
        };
    }
};
exports.SalesService = SalesService;
exports.SalesService = SalesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object, typeof (_b = typeof common_2.TenantDataSourceManager !== "undefined" && common_2.TenantDataSourceManager) === "function" ? _b : Object])
], SalesService);


/***/ }),
/* 28 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Invoice = void 0;
const typeorm_1 = __webpack_require__(17);
const common_1 = __webpack_require__(7);
let Invoice = class Invoice extends common_1.TenantBaseEntity {
};
exports.Invoice = Invoice;
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid' }),
    __metadata("design:type", String)
], Invoice.prototype, "saleId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Invoice.prototype, "invoiceNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'numeric', precision: 14, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], Invoice.prototype, "totalAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'numeric', precision: 14, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], Invoice.prototype, "paidAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'numeric', precision: 14, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], Invoice.prototype, "dueAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'UNPAID' }),
    __metadata("design:type", String)
], Invoice.prototype, "status", void 0);
exports.Invoice = Invoice = __decorate([
    (0, typeorm_1.Entity)('invoices')
], Invoice);


/***/ }),
/* 29 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Payment = void 0;
const typeorm_1 = __webpack_require__(17);
const common_1 = __webpack_require__(7);
let Payment = class Payment extends common_1.TenantBaseEntity {
};
exports.Payment = Payment;
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid' }),
    __metadata("design:type", String)
], Payment.prototype, "invoiceId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'numeric', precision: 14, scale: 2 }),
    __metadata("design:type", Number)
], Payment.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Payment.prototype, "paymentMethod", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp' }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], Payment.prototype, "paymentDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Payment.prototype, "note", void 0);
exports.Payment = Payment = __decorate([
    (0, typeorm_1.Entity)('payments')
], Payment);


/***/ }),
/* 30 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SaleItem = void 0;
const typeorm_1 = __webpack_require__(17);
const common_1 = __webpack_require__(7);
const sale_entity_1 = __webpack_require__(31);
let SaleItem = class SaleItem extends common_1.TenantBaseEntity {
};
exports.SaleItem = SaleItem;
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid' }),
    __metadata("design:type", String)
], SaleItem.prototype, "saleId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid' }),
    __metadata("design:type", String)
], SaleItem.prototype, "productId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'numeric', precision: 14, scale: 2 }),
    __metadata("design:type", Number)
], SaleItem.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'numeric', precision: 14, scale: 2 }),
    __metadata("design:type", Number)
], SaleItem.prototype, "unitPrice", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'numeric', precision: 14, scale: 2 }),
    __metadata("design:type", Number)
], SaleItem.prototype, "totalPrice", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => sale_entity_1.Sale, (sale) => sale.items),
    __metadata("design:type", typeof (_a = typeof sale_entity_1.Sale !== "undefined" && sale_entity_1.Sale) === "function" ? _a : Object)
], SaleItem.prototype, "sale", void 0);
exports.SaleItem = SaleItem = __decorate([
    (0, typeorm_1.Entity)('sale_items')
], SaleItem);


/***/ }),
/* 31 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Sale = void 0;
const typeorm_1 = __webpack_require__(17);
const common_1 = __webpack_require__(7);
const sale_item_entity_1 = __webpack_require__(30);
let Sale = class Sale extends common_1.TenantBaseEntity {
};
exports.Sale = Sale;
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid' }),
    __metadata("design:type", String)
], Sale.prototype, "customerId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Sale.prototype, "saleNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'DRAFT' }),
    __metadata("design:type", String)
], Sale.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'numeric', precision: 14, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], Sale.prototype, "totalAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'numeric', precision: 14, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], Sale.prototype, "discountAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'numeric', precision: 14, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], Sale.prototype, "taxAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'numeric', precision: 14, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], Sale.prototype, "grandTotal", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => sale_item_entity_1.SaleItem, (item) => item.sale, { cascade: true }),
    __metadata("design:type", Array)
], Sale.prototype, "items", void 0);
exports.Sale = Sale = __decorate([
    (0, typeorm_1.Entity)('sales')
], Sale);


/***/ }),
/* 32 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PaymentsController = void 0;
const common_1 = __webpack_require__(1);
const microservices_1 = __webpack_require__(4);
const common_2 = __webpack_require__(7);
const sales_service_1 = __webpack_require__(27);
let PaymentsController = class PaymentsController {
    constructor(service) {
        this.service = service;
    }
    create(payload) {
        return this.service.createPayment(payload.context, payload.data);
    }
    findAll(payload) {
        return this.service.findPayments(payload.context);
    }
};
exports.PaymentsController = PaymentsController;
__decorate([
    (0, microservices_1.MessagePattern)(common_2.PATTERNS.PAYMENT_CREATE),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof common_2.MicroservicePayload !== "undefined" && common_2.MicroservicePayload) === "function" ? _b : Object]),
    __metadata("design:returntype", void 0)
], PaymentsController.prototype, "create", null);
__decorate([
    (0, microservices_1.MessagePattern)(common_2.PATTERNS.PAYMENT_FIND_ALL),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof common_2.MicroservicePayload !== "undefined" && common_2.MicroservicePayload) === "function" ? _c : Object]),
    __metadata("design:returntype", void 0)
], PaymentsController.prototype, "findAll", null);
exports.PaymentsController = PaymentsController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof sales_service_1.SalesService !== "undefined" && sales_service_1.SalesService) === "function" ? _a : Object])
], PaymentsController);


/***/ }),
/* 33 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SalesController = void 0;
const common_1 = __webpack_require__(1);
const microservices_1 = __webpack_require__(4);
const common_2 = __webpack_require__(7);
const sales_service_1 = __webpack_require__(27);
let SalesController = class SalesController {
    constructor(service) {
        this.service = service;
    }
    create(payload) {
        return this.service.createSale(payload.context, payload.data);
    }
    findAll(payload) {
        return this.service.findSales(payload.context);
    }
    findById(payload) {
        return this.service.findSaleById(payload.context, payload.data.id);
    }
};
exports.SalesController = SalesController;
__decorate([
    (0, microservices_1.MessagePattern)(common_2.PATTERNS.SALE_CREATE),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof common_2.MicroservicePayload !== "undefined" && common_2.MicroservicePayload) === "function" ? _b : Object]),
    __metadata("design:returntype", void 0)
], SalesController.prototype, "create", null);
__decorate([
    (0, microservices_1.MessagePattern)(common_2.PATTERNS.SALE_FIND_ALL),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof common_2.MicroservicePayload !== "undefined" && common_2.MicroservicePayload) === "function" ? _c : Object]),
    __metadata("design:returntype", void 0)
], SalesController.prototype, "findAll", null);
__decorate([
    (0, microservices_1.MessagePattern)(common_2.PATTERNS.SALE_FIND_BY_ID),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof common_2.MicroservicePayload !== "undefined" && common_2.MicroservicePayload) === "function" ? _d : Object]),
    __metadata("design:returntype", void 0)
], SalesController.prototype, "findById", null);
exports.SalesController = SalesController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof sales_service_1.SalesService !== "undefined" && sales_service_1.SalesService) === "function" ? _a : Object])
], SalesController);


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
const common_1 = __webpack_require__(1);
const config_1 = __webpack_require__(2);
const core_1 = __webpack_require__(3);
const microservices_1 = __webpack_require__(4);
const app_module_1 = __webpack_require__(5);
async function bootstrap() {
    const app = await core_1.NestFactory.createMicroservice(app_module_1.AppModule, {
        transport: microservices_1.Transport.TCP,
        options: {
            host: process.env.SALES_SERVICE_HOST ?? 'localhost',
            port: Number(process.env.SALES_SERVICE_PORT ?? 3005),
        },
    });
    app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true, transform: true }));
    const config = app.get(config_1.ConfigService);
    await app.listen();
    common_1.Logger.log(`Sales service listening on TCP ${config.get('SALES_SERVICE_PORT', 3005)}`);
}
bootstrap();

})();

/******/ })()
;