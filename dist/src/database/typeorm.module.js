"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var TypeOrmDynamicModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeOrmDynamicModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
let TypeOrmDynamicModule = TypeOrmDynamicModule_1 = class TypeOrmDynamicModule {
    static forRoot(config) {
        return {
            module: TypeOrmDynamicModule_1,
            imports: [
                typeorm_1.TypeOrmModule.forRootAsync({
                    inject: [config_1.ConfigService],
                    useFactory: (configService) => {
                        return TypeOrmDynamicModule_1.createTypeOrmOptions(configService, config);
                    },
                }),
            ],
        };
    }
    static createTypeOrmOptions(configService, config) {
        return {
            type: config.type || 'postgres',
            host: config.host || configService.get('POSTGRES_HOST'),
            port: config.port || configService.get('POSTGRES_PORT'),
            username: config.username || configService.get('POSTGRES_USER'),
            password: config.password || configService.get('POSTGRES_PASSWORD'),
            database: config.database || configService.get('POSTGRES_DB'),
            autoLoadEntities: true,
            connectTimeoutMS: 2000,
            entities: config.entities || [],
            synchronize: config.synchronize || false,
        };
    }
    static forFeature(entities) {
        return {
            module: TypeOrmDynamicModule_1,
            imports: [typeorm_1.TypeOrmModule.forFeature(entities)],
        };
    }
};
TypeOrmDynamicModule = TypeOrmDynamicModule_1 = __decorate([
    (0, common_1.Module)({})
], TypeOrmDynamicModule);
exports.TypeOrmDynamicModule = TypeOrmDynamicModule;
//# sourceMappingURL=typeorm.module.js.map