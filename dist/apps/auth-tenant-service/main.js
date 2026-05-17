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
const microservices_1 = __webpack_require__(4);
const jwt_1 = __webpack_require__(6);
const common_2 = __webpack_require__(7);
const auth_controller_1 = __webpack_require__(25);
const auth_service_1 = __webpack_require__(26);
const tenant_provisioning_service_1 = __webpack_require__(29);
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            jwt_1.JwtModule.registerAsync({
                inject: [config_1.ConfigService],
                useFactory: (config) => ({
                    secret: config.get('JWT_SECRET', 'change_me'),
                    signOptions: { expiresIn: '1d' },
                }),
            }),
            microservices_1.ClientsModule.registerAsync([
                {
                    name: common_2.SERVICES.USER,
                    inject: [config_1.ConfigService],
                    useFactory: (config) => ({
                        transport: microservices_1.Transport.TCP,
                        options: {
                            host: config.get('USER_SERVICE_HOST', 'localhost'),
                            port: config.get('USER_SERVICE_PORT', 3002),
                        },
                    }),
                },
            ]),
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [auth_service_1.AuthService, tenant_provisioning_service_1.TenantProvisioningService, common_2.TenantDataSourceManager],
    })
], AppModule);


/***/ }),
/* 6 */
/***/ ((module) => {

module.exports = require("@nestjs/jwt");

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
__exportStar(__webpack_require__(22), exports);
__exportStar(__webpack_require__(24), exports);


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
const jwt_1 = __webpack_require__(6);
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
const rxjs_1 = __webpack_require__(23);
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
/* 23 */
/***/ ((module) => {

module.exports = require("rxjs");

/***/ }),
/* 24 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 25 */
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
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthController = void 0;
const common_1 = __webpack_require__(1);
const microservices_1 = __webpack_require__(4);
const common_2 = __webpack_require__(7);
const auth_service_1 = __webpack_require__(26);
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    register(payload) {
        return this.authService.register(payload.data);
    }
    createTenant(payload) {
        return this.authService.createTenant(payload.data);
    }
    login(payload) {
        return this.authService.login(payload.data);
    }
    validate(payload) {
        return this.authService.validate(payload.data.token);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, microservices_1.MessagePattern)(common_2.PATTERNS.AUTH_REGISTER),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof common_2.MicroservicePayload !== "undefined" && common_2.MicroservicePayload) === "function" ? _b : Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "register", null);
__decorate([
    (0, microservices_1.MessagePattern)(common_2.PATTERNS.AUTH_CREATE_TENANT),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof common_2.MicroservicePayload !== "undefined" && common_2.MicroservicePayload) === "function" ? _c : Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "createTenant", null);
__decorate([
    (0, microservices_1.MessagePattern)(common_2.PATTERNS.AUTH_LOGIN),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof common_2.MicroservicePayload !== "undefined" && common_2.MicroservicePayload) === "function" ? _d : Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "login", null);
__decorate([
    (0, microservices_1.MessagePattern)(common_2.PATTERNS.AUTH_VALIDATE),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_e = typeof common_2.MicroservicePayload !== "undefined" && common_2.MicroservicePayload) === "function" ? _e : Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "validate", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _a : Object])
], AuthController);


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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthService = void 0;
const common_1 = __webpack_require__(1);
const jwt_1 = __webpack_require__(6);
const microservices_1 = __webpack_require__(4);
const crypto_1 = __webpack_require__(27);
const bcrypt = __webpack_require__(28);
const common_2 = __webpack_require__(7);
const rxjs_1 = __webpack_require__(23);
const tenant_provisioning_service_1 = __webpack_require__(29);
let AuthService = class AuthService {
    constructor(userClient, jwtService, tenantProvisioning) {
        this.userClient = userClient;
        this.jwtService = jwtService;
        this.tenantProvisioning = tenantProvisioning;
    }
    async register(dto) {
        return this.createTenant(dto);
    }
    async createTenant(dto) {
        const tenantId = (0, crypto_1.randomUUID)();
        const password = await bcrypt.hash(dto.password, 10);
        const user = await this.send(common_2.PATTERNS.USER_CREATE, {
            context: { tenantId },
            data: {
                tenantId,
                email: dto.email,
                password,
                fullName: dto.fullName,
                role: 'ADMIN',
                isActive: true,
            },
        });
        const accessToken = this.sign(user);
        const databases = await this.tenantProvisioning.provisionBusinessDatabases(tenantId);
        return {
            tenantId,
            companyName: dto.companyName,
            user: this.toPublicUser(user),
            databases,
            accessToken,
        };
    }
    async login(dto) {
        const user = await this.send(common_2.PATTERNS.USER_FIND_BY_EMAIL, {
            context: { tenantId: '00000000-0000-0000-0000-000000000000' },
            data: { email: dto.email },
        });
        if (!user?.isActive) {
            throw new microservices_1.RpcException('Invalid credentials');
        }
        const passwordMatches = await bcrypt.compare(dto.password, user.password);
        if (!passwordMatches) {
            throw new microservices_1.RpcException('Invalid credentials');
        }
        return {
            user: this.toPublicUser(user),
            accessToken: this.sign(user),
        };
    }
    validate(token) {
        try {
            return this.jwtService.verify(token);
        }
        catch {
            throw new microservices_1.RpcException('Invalid token');
        }
    }
    sign(user) {
        const payload = {
            sub: user.id,
            tenantId: user.tenantId,
            email: user.email,
            role: user.role,
        };
        return this.jwtService.sign(payload);
    }
    toPublicUser(user) {
        const { password, ...publicUser } = user;
        return publicUser;
    }
    async send(pattern, payload) {
        return (0, rxjs_1.firstValueFrom)(this.userClient.send(pattern, payload).pipe((0, rxjs_1.timeout)(5000), (0, rxjs_1.catchError)((error) => (0, rxjs_1.throwError)(() => new microservices_1.RpcException(error?.message ?? 'User service unavailable')))));
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(common_2.SERVICES.USER)),
    __metadata("design:paramtypes", [typeof (_a = typeof microservices_1.ClientProxy !== "undefined" && microservices_1.ClientProxy) === "function" ? _a : Object, typeof (_b = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _b : Object, typeof (_c = typeof tenant_provisioning_service_1.TenantProvisioningService !== "undefined" && tenant_provisioning_service_1.TenantProvisioningService) === "function" ? _c : Object])
], AuthService);


/***/ }),
/* 27 */
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),
/* 28 */
/***/ ((module) => {

module.exports = require("bcrypt");

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
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TenantProvisioningService = void 0;
const common_1 = __webpack_require__(1);
const config_1 = __webpack_require__(2);
const common_2 = __webpack_require__(7);
const customer_entity_1 = __webpack_require__(30);
const supplier_entity_1 = __webpack_require__(31);
const product_entity_1 = __webpack_require__(32);
const stock_movement_entity_1 = __webpack_require__(33);
const warehouse_entity_1 = __webpack_require__(34);
const invoice_entity_1 = __webpack_require__(35);
const payment_entity_1 = __webpack_require__(36);
const sale_item_entity_1 = __webpack_require__(37);
const sale_entity_1 = __webpack_require__(38);
let TenantProvisioningService = class TenantProvisioningService {
    constructor(config, tenantDataSources) {
        this.config = config;
        this.tenantDataSources = tenantDataSources;
    }
    async provisionBusinessDatabases(tenantId) {
        const [party, inventory, sales] = await Promise.all([
            this.provisionPartyDatabase(tenantId),
            this.provisionInventoryDatabase(tenantId),
            this.provisionSalesDatabase(tenantId),
        ]);
        return { party, inventory, sales };
    }
    async provisionPartyDatabase(tenantId) {
        const dataSource = await this.tenantDataSources.getDataSource({
            tenantId,
            databasePrefix: this.config.get('PARTY_TENANT_DB_PREFIX', 'ims_party_tenant'),
            host: this.config.get('PARTY_DB_HOST', 'localhost'),
            port: this.config.get('PARTY_DB_PORT', 5432),
            username: this.config.get('PARTY_DB_USER', 'postgres'),
            password: this.config.get('PARTY_DB_PASS', 'postgres'),
            maintenanceDatabase: this.config.get('POSTGRES_MAINTENANCE_DB', 'postgres'),
            entities: [customer_entity_1.Customer, supplier_entity_1.Supplier],
            synchronize: this.config.get('DB_SYNCHRONIZE') === 'true',
            migrations: ['dist/apps/party-service/migrations/*.js'],
        });
        return { database: dataSource.options.database };
    }
    async provisionInventoryDatabase(tenantId) {
        const dataSource = await this.tenantDataSources.getDataSource({
            tenantId,
            databasePrefix: this.config.get('INVENTORY_TENANT_DB_PREFIX', 'ims_inventory_tenant'),
            host: this.config.get('INVENTORY_DB_HOST', 'localhost'),
            port: this.config.get('INVENTORY_DB_PORT', 5432),
            username: this.config.get('INVENTORY_DB_USER', 'postgres'),
            password: this.config.get('INVENTORY_DB_PASS', 'postgres'),
            maintenanceDatabase: this.config.get('POSTGRES_MAINTENANCE_DB', 'postgres'),
            entities: [product_entity_1.Product, warehouse_entity_1.Warehouse, stock_movement_entity_1.StockMovement],
            synchronize: this.config.get('DB_SYNCHRONIZE') === 'true',
            migrations: ['dist/apps/inventory-service/migrations/*.js'],
        });
        return { database: dataSource.options.database };
    }
    async provisionSalesDatabase(tenantId) {
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
        return { database: dataSource.options.database };
    }
};
exports.TenantProvisioningService = TenantProvisioningService;
exports.TenantProvisioningService = TenantProvisioningService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object, typeof (_b = typeof common_2.TenantDataSourceManager !== "undefined" && common_2.TenantDataSourceManager) === "function" ? _b : Object])
], TenantProvisioningService);


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Customer = void 0;
const typeorm_1 = __webpack_require__(17);
const common_1 = __webpack_require__(7);
let Customer = class Customer extends common_1.TenantBaseEntity {
};
exports.Customer = Customer;
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Customer.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Customer.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Customer.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Customer.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'numeric', precision: 14, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], Customer.prototype, "openingBalance", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Customer.prototype, "isActive", void 0);
exports.Customer = Customer = __decorate([
    (0, typeorm_1.Entity)('customers')
], Customer);


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
exports.Supplier = void 0;
const typeorm_1 = __webpack_require__(17);
const common_1 = __webpack_require__(7);
let Supplier = class Supplier extends common_1.TenantBaseEntity {
};
exports.Supplier = Supplier;
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Supplier.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Supplier.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Supplier.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Supplier.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'numeric', precision: 14, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], Supplier.prototype, "openingBalance", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Supplier.prototype, "isActive", void 0);
exports.Supplier = Supplier = __decorate([
    (0, typeorm_1.Entity)('suppliers')
], Supplier);


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Product = void 0;
const typeorm_1 = __webpack_require__(17);
const common_1 = __webpack_require__(7);
let Product = class Product extends common_1.TenantBaseEntity {
};
exports.Product = Product;
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Product.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Product.prototype, "sku", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Product.prototype, "barcode", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Product.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Product.prototype, "brand", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'numeric', precision: 14, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], Product.prototype, "purchasePrice", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'numeric', precision: 14, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], Product.prototype, "salePrice", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'numeric', precision: 14, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], Product.prototype, "stockQuantity", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Product.prototype, "isActive", void 0);
exports.Product = Product = __decorate([
    (0, typeorm_1.Entity)('products'),
    (0, typeorm_1.Index)(['tenantId', 'sku'], { unique: true })
], Product);


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StockMovement = void 0;
const typeorm_1 = __webpack_require__(17);
const common_1 = __webpack_require__(7);
let StockMovement = class StockMovement extends common_1.TenantBaseEntity {
};
exports.StockMovement = StockMovement;
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid' }),
    __metadata("design:type", String)
], StockMovement.prototype, "productId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid' }),
    __metadata("design:type", String)
], StockMovement.prototype, "warehouseId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], StockMovement.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'numeric', precision: 14, scale: 2 }),
    __metadata("design:type", Number)
], StockMovement.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], StockMovement.prototype, "referenceType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], StockMovement.prototype, "referenceId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], StockMovement.prototype, "note", void 0);
exports.StockMovement = StockMovement = __decorate([
    (0, typeorm_1.Entity)('stock_movements')
], StockMovement);


/***/ }),
/* 34 */
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
exports.Warehouse = void 0;
const typeorm_1 = __webpack_require__(17);
const common_1 = __webpack_require__(7);
let Warehouse = class Warehouse extends common_1.TenantBaseEntity {
};
exports.Warehouse = Warehouse;
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Warehouse.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Warehouse.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Warehouse.prototype, "isActive", void 0);
exports.Warehouse = Warehouse = __decorate([
    (0, typeorm_1.Entity)('warehouses')
], Warehouse);


/***/ }),
/* 35 */
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
/* 36 */
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
/* 37 */
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
const sale_entity_1 = __webpack_require__(38);
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
/* 38 */
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
const sale_item_entity_1 = __webpack_require__(37);
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
            host: process.env.AUTH_SERVICE_HOST ?? 'localhost',
            port: Number(process.env.AUTH_SERVICE_PORT ?? 3001),
        },
    });
    app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true, transform: true }));
    const config = app.get(config_1.ConfigService);
    await app.listen();
    common_1.Logger.log(`Auth/Tenant service listening on TCP ${config.get('AUTH_SERVICE_PORT', 3001)}`);
}
bootstrap();

})();

/******/ })()
;