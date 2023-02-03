"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RmqService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const microservices_1 = require("@nestjs/microservices");
let RmqService = class RmqService {
    constructor(configService) {
        this.configService = configService;
    }
    getOptions(noAck = false) {
        const user = this.configService.get('RABBITMQ_USER');
        const password = this.configService.get('RABBITMQ_PASSWORD');
        const host = this.configService.get('RABBITMQ_HOST');
        const queueName = this.configService.get('RABBITMQ_QUEUE_NAME');
        return {
            transport: microservices_1.Transport.RMQ,
            options: {
                urls: [`amqp://${user}:${password}@${host}`],
                queue: queueName,
                noAck,
                persistent: true,
                queueOptions: {
                    durable: true,
                },
            },
        };
    }
};
RmqService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], RmqService);
exports.RmqService = RmqService;
//# sourceMappingURL=rmq.service.js.map