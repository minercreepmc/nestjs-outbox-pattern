"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeormConfig = void 0;
const config_1 = require("@nestjs/config");
const configService = new config_1.ConfigService();
exports.typeormConfig = {
    type: 'postgres',
    host: configService.get('POSTGRES_HOST'),
    port: configService.get('POSTGRES_PORT'),
    username: configService.get('POSTGRES_USER'),
    password: configService.get('POSTGRES_PASSWORD'),
    database: configService.get('POSTGRES_DB'),
    entities: [],
    autoLoadEntities: true,
    connectTimeoutMS: 2000,
};
//# sourceMappingURL=typeorm.config.js.map