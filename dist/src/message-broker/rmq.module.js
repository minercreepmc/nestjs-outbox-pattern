"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var RmqModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RmqModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const microservices_1 = require("@nestjs/microservices");
const rmq_service_1 = require("./rmq.service");
let RmqModule = RmqModule_1 = class RmqModule {
    static register(name, config) {
        return {
            module: RmqModule_1,
            exports: [microservices_1.ClientsModule],
            imports: [RmqModule_1.registerClient(name, config)],
        };
    }
    static registerClient(name, config) {
        return microservices_1.ClientsModule.registerAsync([
            {
                name,
                inject: [config_1.ConfigService],
                useFactory: (configService) => {
                    return RmqModule_1.createOptions(configService, config);
                },
            },
        ]);
    }
    static createOptions(configService, config) {
        const user = config.user || configService.get('RABBITMQ_USER');
        const password = config.password || configService.get('RABBITMQ_PASSWORD');
        const host = config.host || configService.get('RABBITMQ_HOST');
        const queueName = config.queueName || configService.get('RABBITMQ_QUEUE_NAME');
        return {
            transport: microservices_1.Transport.RMQ,
            options: {
                urls: [`amqp://${user}:${password}@${host}`],
                queue: queueName,
            },
        };
    }
};
RmqModule = RmqModule_1 = __decorate([
    (0, common_1.Module)({
        providers: [rmq_service_1.RmqService],
        exports: [rmq_service_1.RmqService],
    })
], RmqModule);
exports.RmqModule = RmqModule;
//# sourceMappingURL=rmq.module.js.map