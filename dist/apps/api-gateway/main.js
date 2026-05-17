/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./apps/api-gateway/src/app.module.ts":
/*!********************************************!*\
  !*** ./apps/api-gateway/src/app.module.ts ***!
  \********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const jwt_1 = __webpack_require__(/*! @nestjs/jwt */ "@nestjs/jwt");
const common_2 = __webpack_require__(/*! @app/common */ "./libs/common/src/index.ts");
const auth_controller_1 = __webpack_require__(/*! ./auth/auth.controller */ "./apps/api-gateway/src/auth/auth.controller.ts");
const users_controller_1 = __webpack_require__(/*! ./users/users.controller */ "./apps/api-gateway/src/users/users.controller.ts");
const parties_controller_1 = __webpack_require__(/*! ./parties/parties.controller */ "./apps/api-gateway/src/parties/parties.controller.ts");
const inventory_controller_1 = __webpack_require__(/*! ./inventory/inventory.controller */ "./apps/api-gateway/src/inventory/inventory.controller.ts");
const sales_controller_1 = __webpack_require__(/*! ./sales/sales.controller */ "./apps/api-gateway/src/sales/sales.controller.ts");
const microservice_proxy_1 = __webpack_require__(/*! ./common/microservice.proxy */ "./apps/api-gateway/src/common/microservice.proxy.ts");
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
                }),
            }),
            microservices_1.ClientsModule.registerAsync([
                {
                    name: common_2.SERVICES.AUTH,
                    inject: [config_1.ConfigService],
                    useFactory: (config) => ({
                        transport: microservices_1.Transport.TCP,
                        options: {
                            host: config.get('AUTH_SERVICE_HOST', 'localhost'),
                            port: config.get('AUTH_SERVICE_PORT', 3001),
                        },
                    }),
                },
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
                {
                    name: common_2.SERVICES.PARTY,
                    inject: [config_1.ConfigService],
                    useFactory: (config) => ({
                        transport: microservices_1.Transport.TCP,
                        options: {
                            host: config.get('PARTY_SERVICE_HOST', 'localhost'),
                            port: config.get('PARTY_SERVICE_PORT', 3003),
                        },
                    }),
                },
                {
                    name: common_2.SERVICES.INVENTORY,
                    inject: [config_1.ConfigService],
                    useFactory: (config) => ({
                        transport: microservices_1.Transport.TCP,
                        options: {
                            host: config.get('INVENTORY_SERVICE_HOST', 'localhost'),
                            port: config.get('INVENTORY_SERVICE_PORT', 3004),
                        },
                    }),
                },
                {
                    name: common_2.SERVICES.SALES,
                    inject: [config_1.ConfigService],
                    useFactory: (config) => ({
                        transport: microservices_1.Transport.TCP,
                        options: {
                            host: config.get('SALES_SERVICE_HOST', 'localhost'),
                            port: config.get('SALES_SERVICE_PORT', 3005),
                        },
                    }),
                },
            ]),
        ],
        controllers: [
            auth_controller_1.AuthController,
            users_controller_1.UsersController,
            parties_controller_1.PartiesController,
            inventory_controller_1.InventoryController,
            sales_controller_1.SalesController,
        ],
        providers: [microservice_proxy_1.MicroserviceProxy],
    })
], AppModule);


/***/ }),

/***/ "./apps/api-gateway/src/auth/auth.controller.ts":
/*!******************************************************!*\
  !*** ./apps/api-gateway/src/auth/auth.controller.ts ***!
  \******************************************************/
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
exports.AuthController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const common_2 = __webpack_require__(/*! @app/common */ "./libs/common/src/index.ts");
const microservice_proxy_1 = __webpack_require__(/*! ../common/microservice.proxy */ "./apps/api-gateway/src/common/microservice.proxy.ts");
const auth_dto_1 = __webpack_require__(/*! ./auth.dto */ "./apps/api-gateway/src/auth/auth.dto.ts");
let AuthController = class AuthController {
    constructor(proxy) {
        this.proxy = proxy;
    }
    register(dto) {
        return this.proxy.send(this.proxy.auth, common_2.PATTERNS.AUTH_REGISTER, {
            context: { tenantId: '00000000-0000-0000-0000-000000000000' },
            data: dto,
        });
    }
    createTenant(dto) {
        return this.proxy.send(this.proxy.auth, common_2.PATTERNS.AUTH_CREATE_TENANT, {
            context: { tenantId: '00000000-0000-0000-0000-000000000000' },
            data: dto,
        });
    }
    login(dto) {
        return this.proxy.send(this.proxy.auth, common_2.PATTERNS.AUTH_LOGIN, {
            context: { tenantId: '00000000-0000-0000-0000-000000000000' },
            data: dto,
        });
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof auth_dto_1.RegisterDto !== "undefined" && auth_dto_1.RegisterDto) === "function" ? _b : Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('tenants'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof auth_dto_1.RegisterDto !== "undefined" && auth_dto_1.RegisterDto) === "function" ? _c : Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "createTenant", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof auth_dto_1.LoginDto !== "undefined" && auth_dto_1.LoginDto) === "function" ? _d : Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "login", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [typeof (_a = typeof microservice_proxy_1.MicroserviceProxy !== "undefined" && microservice_proxy_1.MicroserviceProxy) === "function" ? _a : Object])
], AuthController);


/***/ }),

/***/ "./apps/api-gateway/src/auth/auth.dto.ts":
/*!***********************************************!*\
  !*** ./apps/api-gateway/src/auth/auth.dto.ts ***!
  \***********************************************/
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
exports.LoginDto = exports.RegisterDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class RegisterDto {
}
exports.RegisterDto = RegisterDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegisterDto.prototype, "companyName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegisterDto.prototype, "fullName", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], RegisterDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(6),
    __metadata("design:type", String)
], RegisterDto.prototype, "password", void 0);
class LoginDto {
}
exports.LoginDto = LoginDto;
__decorate([
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], LoginDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], LoginDto.prototype, "password", void 0);


/***/ }),

/***/ "./apps/api-gateway/src/common/context.util.ts":
/*!*****************************************************!*\
  !*** ./apps/api-gateway/src/common/context.util.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.buildContext = buildContext;
function buildContext(user) {
    return {
        tenantId: user.tenantId,
        userId: user.sub,
        role: user.role,
    };
}


/***/ }),

/***/ "./apps/api-gateway/src/common/microservice.proxy.ts":
/*!***********************************************************!*\
  !*** ./apps/api-gateway/src/common/microservice.proxy.ts ***!
  \***********************************************************/
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
exports.MicroserviceProxy = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const common_2 = __webpack_require__(/*! @app/common */ "./libs/common/src/index.ts");
const rxjs_1 = __webpack_require__(/*! rxjs */ "rxjs");
let MicroserviceProxy = class MicroserviceProxy {
    constructor(auth, user, party, inventory, sales) {
        this.auth = auth;
        this.user = user;
        this.party = party;
        this.inventory = inventory;
        this.sales = sales;
    }
    async send(client, pattern, payload) {
        return (0, rxjs_1.firstValueFrom)(client.send(pattern, payload).pipe((0, rxjs_1.timeout)(5000), (0, rxjs_1.catchError)((error) => {
            if (error.name === 'TimeoutError') {
                return (0, rxjs_1.throwError)(() => new common_1.RequestTimeoutException('Microservice request timed out'));
            }
            return (0, rxjs_1.throwError)(() => new common_1.InternalServerErrorException(error?.message ?? 'Microservice request failed'));
        })));
    }
};
exports.MicroserviceProxy = MicroserviceProxy;
exports.MicroserviceProxy = MicroserviceProxy = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(common_2.SERVICES.AUTH)),
    __param(1, (0, common_1.Inject)(common_2.SERVICES.USER)),
    __param(2, (0, common_1.Inject)(common_2.SERVICES.PARTY)),
    __param(3, (0, common_1.Inject)(common_2.SERVICES.INVENTORY)),
    __param(4, (0, common_1.Inject)(common_2.SERVICES.SALES)),
    __metadata("design:paramtypes", [typeof (_a = typeof microservices_1.ClientProxy !== "undefined" && microservices_1.ClientProxy) === "function" ? _a : Object, typeof (_b = typeof microservices_1.ClientProxy !== "undefined" && microservices_1.ClientProxy) === "function" ? _b : Object, typeof (_c = typeof microservices_1.ClientProxy !== "undefined" && microservices_1.ClientProxy) === "function" ? _c : Object, typeof (_d = typeof microservices_1.ClientProxy !== "undefined" && microservices_1.ClientProxy) === "function" ? _d : Object, typeof (_e = typeof microservices_1.ClientProxy !== "undefined" && microservices_1.ClientProxy) === "function" ? _e : Object])
], MicroserviceProxy);


/***/ }),

/***/ "./apps/api-gateway/src/dtos/inventory.dto.ts":
/*!****************************************************!*\
  !*** ./apps/api-gateway/src/dtos/inventory.dto.ts ***!
  \****************************************************/
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
exports.CreateStockMovementDto = exports.CreateWarehouseDto = exports.CreateProductDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class CreateProductDto {
}
exports.CreateProductDto = CreateProductDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProductDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProductDto.prototype, "sku", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProductDto.prototype, "barcode", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProductDto.prototype, "category", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProductDto.prototype, "brand", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateProductDto.prototype, "purchasePrice", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateProductDto.prototype, "salePrice", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateProductDto.prototype, "stockQuantity", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateProductDto.prototype, "isActive", void 0);
class CreateWarehouseDto {
}
exports.CreateWarehouseDto = CreateWarehouseDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateWarehouseDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateWarehouseDto.prototype, "address", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateWarehouseDto.prototype, "isActive", void 0);
class CreateStockMovementDto {
}
exports.CreateStockMovementDto = CreateStockMovementDto;
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateStockMovementDto.prototype, "productId", void 0);
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateStockMovementDto.prototype, "warehouseId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateStockMovementDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateStockMovementDto.prototype, "quantity", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateStockMovementDto.prototype, "referenceType", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateStockMovementDto.prototype, "referenceId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateStockMovementDto.prototype, "note", void 0);


/***/ }),

/***/ "./apps/api-gateway/src/dtos/party.dto.ts":
/*!************************************************!*\
  !*** ./apps/api-gateway/src/dtos/party.dto.ts ***!
  \************************************************/
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
exports.CreatePartyDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class CreatePartyDto {
}
exports.CreatePartyDto = CreatePartyDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePartyDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePartyDto.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], CreatePartyDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePartyDto.prototype, "address", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreatePartyDto.prototype, "openingBalance", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreatePartyDto.prototype, "isActive", void 0);


/***/ }),

/***/ "./apps/api-gateway/src/dtos/product-query.dto.ts":
/*!********************************************************!*\
  !*** ./apps/api-gateway/src/dtos/product-query.dto.ts ***!
  \********************************************************/
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
exports.ProductQueryDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const class_transformer_1 = __webpack_require__(/*! class-transformer */ "class-transformer");
class ProductQueryDto {
}
exports.ProductQueryDto = ProductQueryDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], ProductQueryDto.prototype, "page", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(500),
    __metadata("design:type", Number)
], ProductQueryDto.prototype, "limit", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ProductQueryDto.prototype, "search", void 0);


/***/ }),

/***/ "./apps/api-gateway/src/dtos/sales.dto.ts":
/*!************************************************!*\
  !*** ./apps/api-gateway/src/dtos/sales.dto.ts ***!
  \************************************************/
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
exports.CreatePaymentDto = exports.CreateInvoiceDto = exports.CreateSaleDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const class_transformer_1 = __webpack_require__(/*! class-transformer */ "class-transformer");
class CreateSaleItemDto {
}
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateSaleItemDto.prototype, "productId", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateSaleItemDto.prototype, "quantity", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateSaleItemDto.prototype, "unitPrice", void 0);
class CreateSaleDto {
}
exports.CreateSaleDto = CreateSaleDto;
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateSaleDto.prototype, "customerId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSaleDto.prototype, "saleNumber", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSaleDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateSaleDto.prototype, "discountAmount", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateSaleDto.prototype, "taxAmount", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => CreateSaleItemDto),
    __metadata("design:type", Array)
], CreateSaleDto.prototype, "items", void 0);
class CreateInvoiceDto {
}
exports.CreateInvoiceDto = CreateInvoiceDto;
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateInvoiceDto.prototype, "saleId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateInvoiceDto.prototype, "invoiceNumber", void 0);
class CreatePaymentDto {
}
exports.CreatePaymentDto = CreatePaymentDto;
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreatePaymentDto.prototype, "invoiceId", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreatePaymentDto.prototype, "amount", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePaymentDto.prototype, "paymentMethod", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreatePaymentDto.prototype, "paymentDate", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePaymentDto.prototype, "note", void 0);


/***/ }),

/***/ "./apps/api-gateway/src/dtos/updateProduct.dto.ts":
/*!********************************************************!*\
  !*** ./apps/api-gateway/src/dtos/updateProduct.dto.ts ***!
  \********************************************************/
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
exports.UpdateProductDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class UpdateProductDto {
}
exports.UpdateProductDto = UpdateProductDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateProductDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateProductDto.prototype, "sku", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateProductDto.prototype, "barcode", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateProductDto.prototype, "category", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateProductDto.prototype, "brand", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateProductDto.prototype, "purchasePrice", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateProductDto.prototype, "salePrice", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateProductDto.prototype, "stockQuantity", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateProductDto.prototype, "isActive", void 0);


/***/ }),

/***/ "./apps/api-gateway/src/dtos/user.dto.ts":
/*!***********************************************!*\
  !*** ./apps/api-gateway/src/dtos/user.dto.ts ***!
  \***********************************************/
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
exports.CreateUserDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class CreateUserDto {
}
exports.CreateUserDto = CreateUserDto;
__decorate([
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(6),
    __metadata("design:type", String)
], CreateUserDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "fullName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "role", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateUserDto.prototype, "isActive", void 0);


/***/ }),

/***/ "./apps/api-gateway/src/inventory/inventory.controller.ts":
/*!****************************************************************!*\
  !*** ./apps/api-gateway/src/inventory/inventory.controller.ts ***!
  \****************************************************************/
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
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InventoryController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const common_2 = __webpack_require__(/*! @app/common */ "./libs/common/src/index.ts");
const context_util_1 = __webpack_require__(/*! ../common/context.util */ "./apps/api-gateway/src/common/context.util.ts");
const microservice_proxy_1 = __webpack_require__(/*! ../common/microservice.proxy */ "./apps/api-gateway/src/common/microservice.proxy.ts");
const inventory_dto_1 = __webpack_require__(/*! ../dtos/inventory.dto */ "./apps/api-gateway/src/dtos/inventory.dto.ts");
const updateProduct_dto_1 = __webpack_require__(/*! ../dtos/updateProduct.dto */ "./apps/api-gateway/src/dtos/updateProduct.dto.ts");
const product_query_dto_1 = __webpack_require__(/*! ../dtos/product-query.dto */ "./apps/api-gateway/src/dtos/product-query.dto.ts");
let InventoryController = class InventoryController {
    constructor(proxy) {
        this.proxy = proxy;
    }
    products(user, query) {
        return this.proxy.send(this.proxy.inventory, common_2.PATTERNS.PRODUCT_FIND_ALL, {
            context: (0, context_util_1.buildContext)(user),
            data: query,
        });
    }
    productBySku(user, sku) {
        return this.proxy.send(this.proxy.inventory, common_2.PATTERNS.PRODUCT_FIND_BY_SKU, {
            context: (0, context_util_1.buildContext)(user),
            data: { sku },
        });
    }
    product(user, id) {
        return this.proxy.send(this.proxy.inventory, common_2.PATTERNS.PRODUCT_FIND_BY_ID, {
            context: (0, context_util_1.buildContext)(user),
            data: { id },
        });
    }
    updateProductBySku(user, sku, dto) {
        return this.proxy.send(this.proxy.inventory, common_2.PATTERNS.PRODUCT_UPDATE_BY_SKU, {
            context: (0, context_util_1.buildContext)(user),
            data: { sku, ...dto },
        });
    }
    updateProduct(user, id, dto) {
        return this.proxy.send(this.proxy.inventory, common_2.PATTERNS.PRODUCT_UPDATE, {
            context: (0, context_util_1.buildContext)(user),
            data: { id, ...dto },
        });
    }
    createProduct(user, dto) {
        return this.proxy.send(this.proxy.inventory, common_2.PATTERNS.PRODUCT_CREATE, {
            context: (0, context_util_1.buildContext)(user),
            data: dto,
        });
    }
    warehouses(user) {
        return this.proxy.send(this.proxy.inventory, common_2.PATTERNS.WAREHOUSE_FIND_ALL, {
            context: (0, context_util_1.buildContext)(user),
        });
    }
    createWarehouse(user, dto) {
        return this.proxy.send(this.proxy.inventory, common_2.PATTERNS.WAREHOUSE_CREATE, {
            context: (0, context_util_1.buildContext)(user),
            data: dto,
        });
    }
    stockMovements(user) {
        return this.proxy.send(this.proxy.inventory, common_2.PATTERNS.STOCK_MOVEMENT_FIND_ALL, { context: (0, context_util_1.buildContext)(user) });
    }
    createStockMovement(user, dto) {
        return this.proxy.send(this.proxy.inventory, common_2.PATTERNS.STOCK_MOVEMENT_CREATE, { context: (0, context_util_1.buildContext)(user), data: dto });
    }
};
exports.InventoryController = InventoryController;
__decorate([
    (0, common_1.Get)('products'),
    __param(0, (0, common_2.CurrentUser)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof common_2.JwtPayload !== "undefined" && common_2.JwtPayload) === "function" ? _b : Object, typeof (_c = typeof product_query_dto_1.ProductQueryDto !== "undefined" && product_query_dto_1.ProductQueryDto) === "function" ? _c : Object]),
    __metadata("design:returntype", void 0)
], InventoryController.prototype, "products", null);
__decorate([
    (0, common_1.Get)('products/sku/:sku'),
    __param(0, (0, common_2.CurrentUser)()),
    __param(1, (0, common_1.Param)('sku')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof common_2.JwtPayload !== "undefined" && common_2.JwtPayload) === "function" ? _d : Object, String]),
    __metadata("design:returntype", void 0)
], InventoryController.prototype, "productBySku", null);
__decorate([
    (0, common_1.Get)('products/:id'),
    __param(0, (0, common_2.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_e = typeof common_2.JwtPayload !== "undefined" && common_2.JwtPayload) === "function" ? _e : Object, String]),
    __metadata("design:returntype", void 0)
], InventoryController.prototype, "product", null);
__decorate([
    (0, common_1.Patch)('products/sku/:sku'),
    __param(0, (0, common_2.CurrentUser)()),
    __param(1, (0, common_1.Param)('sku')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_f = typeof common_2.JwtPayload !== "undefined" && common_2.JwtPayload) === "function" ? _f : Object, String, typeof (_g = typeof updateProduct_dto_1.UpdateProductDto !== "undefined" && updateProduct_dto_1.UpdateProductDto) === "function" ? _g : Object]),
    __metadata("design:returntype", void 0)
], InventoryController.prototype, "updateProductBySku", null);
__decorate([
    (0, common_1.Patch)('products/:id'),
    __param(0, (0, common_2.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_h = typeof common_2.JwtPayload !== "undefined" && common_2.JwtPayload) === "function" ? _h : Object, String, typeof (_j = typeof updateProduct_dto_1.UpdateProductDto !== "undefined" && updateProduct_dto_1.UpdateProductDto) === "function" ? _j : Object]),
    __metadata("design:returntype", void 0)
], InventoryController.prototype, "updateProduct", null);
__decorate([
    (0, common_1.Post)('products'),
    __param(0, (0, common_2.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_k = typeof common_2.JwtPayload !== "undefined" && common_2.JwtPayload) === "function" ? _k : Object, typeof (_l = typeof inventory_dto_1.CreateProductDto !== "undefined" && inventory_dto_1.CreateProductDto) === "function" ? _l : Object]),
    __metadata("design:returntype", void 0)
], InventoryController.prototype, "createProduct", null);
__decorate([
    (0, common_1.Get)('warehouses'),
    __param(0, (0, common_2.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_m = typeof common_2.JwtPayload !== "undefined" && common_2.JwtPayload) === "function" ? _m : Object]),
    __metadata("design:returntype", void 0)
], InventoryController.prototype, "warehouses", null);
__decorate([
    (0, common_1.Post)('warehouses'),
    __param(0, (0, common_2.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_o = typeof common_2.JwtPayload !== "undefined" && common_2.JwtPayload) === "function" ? _o : Object, typeof (_p = typeof inventory_dto_1.CreateWarehouseDto !== "undefined" && inventory_dto_1.CreateWarehouseDto) === "function" ? _p : Object]),
    __metadata("design:returntype", void 0)
], InventoryController.prototype, "createWarehouse", null);
__decorate([
    (0, common_1.Get)('stock-movements'),
    __param(0, (0, common_2.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_q = typeof common_2.JwtPayload !== "undefined" && common_2.JwtPayload) === "function" ? _q : Object]),
    __metadata("design:returntype", void 0)
], InventoryController.prototype, "stockMovements", null);
__decorate([
    (0, common_1.Post)('stock-movements'),
    __param(0, (0, common_2.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_r = typeof common_2.JwtPayload !== "undefined" && common_2.JwtPayload) === "function" ? _r : Object, typeof (_s = typeof inventory_dto_1.CreateStockMovementDto !== "undefined" && inventory_dto_1.CreateStockMovementDto) === "function" ? _s : Object]),
    __metadata("design:returntype", void 0)
], InventoryController.prototype, "createStockMovement", null);
exports.InventoryController = InventoryController = __decorate([
    (0, common_1.UseGuards)(common_2.JwtAuthGuard),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof microservice_proxy_1.MicroserviceProxy !== "undefined" && microservice_proxy_1.MicroserviceProxy) === "function" ? _a : Object])
], InventoryController);


/***/ }),

/***/ "./apps/api-gateway/src/parties/parties.controller.ts":
/*!************************************************************!*\
  !*** ./apps/api-gateway/src/parties/parties.controller.ts ***!
  \************************************************************/
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
var _a, _b, _c, _d, _e, _f, _g;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PartiesController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const common_2 = __webpack_require__(/*! @app/common */ "./libs/common/src/index.ts");
const context_util_1 = __webpack_require__(/*! ../common/context.util */ "./apps/api-gateway/src/common/context.util.ts");
const microservice_proxy_1 = __webpack_require__(/*! ../common/microservice.proxy */ "./apps/api-gateway/src/common/microservice.proxy.ts");
const party_dto_1 = __webpack_require__(/*! ../dtos/party.dto */ "./apps/api-gateway/src/dtos/party.dto.ts");
let PartiesController = class PartiesController {
    constructor(proxy) {
        this.proxy = proxy;
    }
    customers(user) {
        return this.proxy.send(this.proxy.party, common_2.PATTERNS.CUSTOMER_FIND_ALL, {
            context: (0, context_util_1.buildContext)(user),
        });
    }
    createCustomer(user, dto) {
        return this.proxy.send(this.proxy.party, common_2.PATTERNS.CUSTOMER_CREATE, {
            context: (0, context_util_1.buildContext)(user),
            data: dto,
        });
    }
    suppliers(user) {
        return this.proxy.send(this.proxy.party, common_2.PATTERNS.SUPPLIER_FIND_ALL, {
            context: (0, context_util_1.buildContext)(user),
        });
    }
    createSupplier(user, dto) {
        return this.proxy.send(this.proxy.party, common_2.PATTERNS.SUPPLIER_CREATE, {
            context: (0, context_util_1.buildContext)(user),
            data: dto,
        });
    }
};
exports.PartiesController = PartiesController;
__decorate([
    (0, common_1.Get)('customers'),
    __param(0, (0, common_2.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof common_2.JwtPayload !== "undefined" && common_2.JwtPayload) === "function" ? _b : Object]),
    __metadata("design:returntype", void 0)
], PartiesController.prototype, "customers", null);
__decorate([
    (0, common_1.Post)('customers'),
    __param(0, (0, common_2.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof common_2.JwtPayload !== "undefined" && common_2.JwtPayload) === "function" ? _c : Object, typeof (_d = typeof party_dto_1.CreatePartyDto !== "undefined" && party_dto_1.CreatePartyDto) === "function" ? _d : Object]),
    __metadata("design:returntype", void 0)
], PartiesController.prototype, "createCustomer", null);
__decorate([
    (0, common_1.Get)('suppliers'),
    __param(0, (0, common_2.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_e = typeof common_2.JwtPayload !== "undefined" && common_2.JwtPayload) === "function" ? _e : Object]),
    __metadata("design:returntype", void 0)
], PartiesController.prototype, "suppliers", null);
__decorate([
    (0, common_1.Post)('suppliers'),
    __param(0, (0, common_2.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_f = typeof common_2.JwtPayload !== "undefined" && common_2.JwtPayload) === "function" ? _f : Object, typeof (_g = typeof party_dto_1.CreatePartyDto !== "undefined" && party_dto_1.CreatePartyDto) === "function" ? _g : Object]),
    __metadata("design:returntype", void 0)
], PartiesController.prototype, "createSupplier", null);
exports.PartiesController = PartiesController = __decorate([
    (0, common_1.UseGuards)(common_2.JwtAuthGuard),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof microservice_proxy_1.MicroserviceProxy !== "undefined" && microservice_proxy_1.MicroserviceProxy) === "function" ? _a : Object])
], PartiesController);


/***/ }),

/***/ "./apps/api-gateway/src/sales/sales.controller.ts":
/*!********************************************************!*\
  !*** ./apps/api-gateway/src/sales/sales.controller.ts ***!
  \********************************************************/
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
var _a, _b, _c, _d, _e, _f, _g, _h, _j;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SalesController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const common_2 = __webpack_require__(/*! @app/common */ "./libs/common/src/index.ts");
const context_util_1 = __webpack_require__(/*! ../common/context.util */ "./apps/api-gateway/src/common/context.util.ts");
const microservice_proxy_1 = __webpack_require__(/*! ../common/microservice.proxy */ "./apps/api-gateway/src/common/microservice.proxy.ts");
const sales_dto_1 = __webpack_require__(/*! ../dtos/sales.dto */ "./apps/api-gateway/src/dtos/sales.dto.ts");
let SalesController = class SalesController {
    constructor(proxy) {
        this.proxy = proxy;
    }
    sales(user) {
        return this.proxy.send(this.proxy.sales, common_2.PATTERNS.SALE_FIND_ALL, {
            context: (0, context_util_1.buildContext)(user),
        });
    }
    createSale(user, dto) {
        return this.proxy.send(this.proxy.sales, common_2.PATTERNS.SALE_CREATE, {
            context: (0, context_util_1.buildContext)(user),
            data: dto,
        });
    }
    invoices(user) {
        return this.proxy.send(this.proxy.sales, common_2.PATTERNS.INVOICE_FIND_ALL, {
            context: (0, context_util_1.buildContext)(user),
        });
    }
    createInvoice(user, dto) {
        return this.proxy.send(this.proxy.sales, common_2.PATTERNS.INVOICE_CREATE, {
            context: (0, context_util_1.buildContext)(user),
            data: dto,
        });
    }
    createPayment(user, dto) {
        return this.proxy.send(this.proxy.sales, common_2.PATTERNS.PAYMENT_CREATE, {
            context: (0, context_util_1.buildContext)(user),
            data: dto,
        });
    }
};
exports.SalesController = SalesController;
__decorate([
    (0, common_1.Get)('sales'),
    __param(0, (0, common_2.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof common_2.JwtPayload !== "undefined" && common_2.JwtPayload) === "function" ? _b : Object]),
    __metadata("design:returntype", void 0)
], SalesController.prototype, "sales", null);
__decorate([
    (0, common_1.Post)('sales'),
    __param(0, (0, common_2.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof common_2.JwtPayload !== "undefined" && common_2.JwtPayload) === "function" ? _c : Object, typeof (_d = typeof sales_dto_1.CreateSaleDto !== "undefined" && sales_dto_1.CreateSaleDto) === "function" ? _d : Object]),
    __metadata("design:returntype", void 0)
], SalesController.prototype, "createSale", null);
__decorate([
    (0, common_1.Get)('invoices'),
    __param(0, (0, common_2.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_e = typeof common_2.JwtPayload !== "undefined" && common_2.JwtPayload) === "function" ? _e : Object]),
    __metadata("design:returntype", void 0)
], SalesController.prototype, "invoices", null);
__decorate([
    (0, common_1.Post)('invoices'),
    __param(0, (0, common_2.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_f = typeof common_2.JwtPayload !== "undefined" && common_2.JwtPayload) === "function" ? _f : Object, typeof (_g = typeof sales_dto_1.CreateInvoiceDto !== "undefined" && sales_dto_1.CreateInvoiceDto) === "function" ? _g : Object]),
    __metadata("design:returntype", void 0)
], SalesController.prototype, "createInvoice", null);
__decorate([
    (0, common_1.Post)('payments'),
    __param(0, (0, common_2.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_h = typeof common_2.JwtPayload !== "undefined" && common_2.JwtPayload) === "function" ? _h : Object, typeof (_j = typeof sales_dto_1.CreatePaymentDto !== "undefined" && sales_dto_1.CreatePaymentDto) === "function" ? _j : Object]),
    __metadata("design:returntype", void 0)
], SalesController.prototype, "createPayment", null);
exports.SalesController = SalesController = __decorate([
    (0, common_1.UseGuards)(common_2.JwtAuthGuard),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof microservice_proxy_1.MicroserviceProxy !== "undefined" && microservice_proxy_1.MicroserviceProxy) === "function" ? _a : Object])
], SalesController);


/***/ }),

/***/ "./apps/api-gateway/src/users/users.controller.ts":
/*!********************************************************!*\
  !*** ./apps/api-gateway/src/users/users.controller.ts ***!
  \********************************************************/
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
exports.UsersController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const common_2 = __webpack_require__(/*! @app/common */ "./libs/common/src/index.ts");
const context_util_1 = __webpack_require__(/*! ../common/context.util */ "./apps/api-gateway/src/common/context.util.ts");
const microservice_proxy_1 = __webpack_require__(/*! ../common/microservice.proxy */ "./apps/api-gateway/src/common/microservice.proxy.ts");
const user_dto_1 = __webpack_require__(/*! ../dtos/user.dto */ "./apps/api-gateway/src/dtos/user.dto.ts");
let UsersController = class UsersController {
    constructor(proxy) {
        this.proxy = proxy;
    }
    findAll(user) {
        return this.proxy.send(this.proxy.user, common_2.PATTERNS.USER_FIND_ALL, {
            context: (0, context_util_1.buildContext)(user),
        });
    }
    create(user, dto) {
        return this.proxy.send(this.proxy.user, common_2.PATTERNS.USER_CREATE, {
            context: (0, context_util_1.buildContext)(user),
            data: dto,
        });
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_2.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof common_2.JwtPayload !== "undefined" && common_2.JwtPayload) === "function" ? _b : Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_2.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof common_2.JwtPayload !== "undefined" && common_2.JwtPayload) === "function" ? _c : Object, typeof (_d = typeof user_dto_1.CreateUserDto !== "undefined" && user_dto_1.CreateUserDto) === "function" ? _d : Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "create", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.UseGuards)(common_2.JwtAuthGuard),
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [typeof (_a = typeof microservice_proxy_1.MicroserviceProxy !== "undefined" && microservice_proxy_1.MicroserviceProxy) === "function" ? _a : Object])
], UsersController);


/***/ }),

/***/ "./libs/common/src/constants/patterns.ts":
/*!***********************************************!*\
  !*** ./libs/common/src/constants/patterns.ts ***!
  \***********************************************/
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

/***/ "./libs/common/src/constants/services.ts":
/*!***********************************************!*\
  !*** ./libs/common/src/constants/services.ts ***!
  \***********************************************/
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

/***/ "./libs/common/src/database/ensure-postgres-database.ts":
/*!**************************************************************!*\
  !*** ./libs/common/src/database/ensure-postgres-database.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ensurePostgresDatabase = ensurePostgresDatabase;
const pg_1 = __webpack_require__(/*! pg */ "pg");
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

/***/ "./libs/common/src/database/tenant-data-source.manager.ts":
/*!****************************************************************!*\
  !*** ./libs/common/src/database/tenant-data-source.manager.ts ***!
  \****************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TenantDataSourceManager = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const ensure_postgres_database_1 = __webpack_require__(/*! ./ensure-postgres-database */ "./libs/common/src/database/ensure-postgres-database.ts");
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

/***/ "./libs/common/src/decorators/current-user.decorator.ts":
/*!**************************************************************!*\
  !*** ./libs/common/src/decorators/current-user.decorator.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CurrentUser = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
exports.CurrentUser = (0, common_1.createParamDecorator)((_data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
});


/***/ }),

/***/ "./libs/common/src/decorators/tenant-id.decorator.ts":
/*!***********************************************************!*\
  !*** ./libs/common/src/decorators/tenant-id.decorator.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TenantId = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
exports.TenantId = (0, common_1.createParamDecorator)((_data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user?.tenantId ?? request.headers['x-tenant-id'];
});


/***/ }),

/***/ "./libs/common/src/dto/request-context.dto.ts":
/*!****************************************************!*\
  !*** ./libs/common/src/dto/request-context.dto.ts ***!
  \****************************************************/
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
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
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

/***/ "./libs/common/src/entities/base.entity.ts":
/*!*************************************************!*\
  !*** ./libs/common/src/entities/base.entity.ts ***!
  \*************************************************/
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
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
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

/***/ "./libs/common/src/entities/tenant-base.entity.ts":
/*!********************************************************!*\
  !*** ./libs/common/src/entities/tenant-base.entity.ts ***!
  \********************************************************/
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
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const base_entity_1 = __webpack_require__(/*! ./base.entity */ "./libs/common/src/entities/base.entity.ts");
class TenantBaseEntity extends base_entity_1.BaseEntity {
}
exports.TenantBaseEntity = TenantBaseEntity;
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ type: 'uuid' }),
    __metadata("design:type", String)
], TenantBaseEntity.prototype, "tenantId", void 0);


/***/ }),

/***/ "./libs/common/src/filters/http-exception.filter.ts":
/*!**********************************************************!*\
  !*** ./libs/common/src/filters/http-exception.filter.ts ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HttpExceptionFilter = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
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

/***/ "./libs/common/src/guards/jwt-auth.guard.ts":
/*!**************************************************!*\
  !*** ./libs/common/src/guards/jwt-auth.guard.ts ***!
  \**************************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const jwt_1 = __webpack_require__(/*! @nestjs/jwt */ "@nestjs/jwt");
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

/***/ "./libs/common/src/index.ts":
/*!**********************************!*\
  !*** ./libs/common/src/index.ts ***!
  \**********************************/
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
__exportStar(__webpack_require__(/*! ./constants/services */ "./libs/common/src/constants/services.ts"), exports);
__exportStar(__webpack_require__(/*! ./constants/patterns */ "./libs/common/src/constants/patterns.ts"), exports);
__exportStar(__webpack_require__(/*! ./decorators/current-user.decorator */ "./libs/common/src/decorators/current-user.decorator.ts"), exports);
__exportStar(__webpack_require__(/*! ./decorators/tenant-id.decorator */ "./libs/common/src/decorators/tenant-id.decorator.ts"), exports);
__exportStar(__webpack_require__(/*! ./dto/request-context.dto */ "./libs/common/src/dto/request-context.dto.ts"), exports);
__exportStar(__webpack_require__(/*! ./database/ensure-postgres-database */ "./libs/common/src/database/ensure-postgres-database.ts"), exports);
__exportStar(__webpack_require__(/*! ./database/tenant-data-source.manager */ "./libs/common/src/database/tenant-data-source.manager.ts"), exports);
__exportStar(__webpack_require__(/*! ./entities/base.entity */ "./libs/common/src/entities/base.entity.ts"), exports);
__exportStar(__webpack_require__(/*! ./entities/tenant-base.entity */ "./libs/common/src/entities/tenant-base.entity.ts"), exports);
__exportStar(__webpack_require__(/*! ./filters/http-exception.filter */ "./libs/common/src/filters/http-exception.filter.ts"), exports);
__exportStar(__webpack_require__(/*! ./guards/jwt-auth.guard */ "./libs/common/src/guards/jwt-auth.guard.ts"), exports);
__exportStar(__webpack_require__(/*! ./interceptors/response.interceptor */ "./libs/common/src/interceptors/response.interceptor.ts"), exports);
__exportStar(__webpack_require__(/*! ./interfaces/jwt-payload.interface */ "./libs/common/src/interfaces/jwt-payload.interface.ts"), exports);


/***/ }),

/***/ "./libs/common/src/interceptors/response.interceptor.ts":
/*!**************************************************************!*\
  !*** ./libs/common/src/interceptors/response.interceptor.ts ***!
  \**************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ResponseInterceptor = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const rxjs_1 = __webpack_require__(/*! rxjs */ "rxjs");
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

/***/ "./libs/common/src/interfaces/jwt-payload.interface.ts":
/*!*************************************************************!*\
  !*** ./libs/common/src/interfaces/jwt-payload.interface.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "@nestjs/common":
/*!*********************************!*\
  !*** external "@nestjs/common" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),

/***/ "@nestjs/config":
/*!*********************************!*\
  !*** external "@nestjs/config" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@nestjs/config");

/***/ }),

/***/ "@nestjs/core":
/*!*******************************!*\
  !*** external "@nestjs/core" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),

/***/ "@nestjs/jwt":
/*!******************************!*\
  !*** external "@nestjs/jwt" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("@nestjs/jwt");

/***/ }),

/***/ "@nestjs/microservices":
/*!****************************************!*\
  !*** external "@nestjs/microservices" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("@nestjs/microservices");

/***/ }),

/***/ "@nestjs/platform-fastify":
/*!*******************************************!*\
  !*** external "@nestjs/platform-fastify" ***!
  \*******************************************/
/***/ ((module) => {

module.exports = require("@nestjs/platform-fastify");

/***/ }),

/***/ "class-transformer":
/*!************************************!*\
  !*** external "class-transformer" ***!
  \************************************/
/***/ ((module) => {

module.exports = require("class-transformer");

/***/ }),

/***/ "class-validator":
/*!**********************************!*\
  !*** external "class-validator" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("class-validator");

/***/ }),

/***/ "pg":
/*!*********************!*\
  !*** external "pg" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("pg");

/***/ }),

/***/ "rxjs":
/*!***********************!*\
  !*** external "rxjs" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("rxjs");

/***/ }),

/***/ "typeorm":
/*!**************************!*\
  !*** external "typeorm" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("typeorm");

/***/ })

/******/ 	});
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
/*!**************************************!*\
  !*** ./apps/api-gateway/src/main.ts ***!
  \**************************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const core_1 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
const platform_fastify_1 = __webpack_require__(/*! @nestjs/platform-fastify */ "@nestjs/platform-fastify");
const common_2 = __webpack_require__(/*! @app/common */ "./libs/common/src/index.ts");
const app_module_1 = __webpack_require__(/*! ./app.module */ "./apps/api-gateway/src/app.module.ts");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, new platform_fastify_1.FastifyAdapter());
    const config = app.get(config_1.ConfigService);
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    app.useGlobalFilters(new common_2.HttpExceptionFilter());
    app.useGlobalInterceptors(new common_2.ResponseInterceptor());
    await app.listen(config.get('API_GATEWAY_PORT', 3000));
}
bootstrap();

})();

/******/ })()
;