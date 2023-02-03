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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OutboxService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const outbox_model_1 = require("./outbox.model");
const typeorm_2 = require("typeorm");
const rmq_service_adapter_1 = require("./rmq.service.adapter");
let OutboxService = class OutboxService {
    constructor(outboxRepository, rabbitMQService) {
        this.outboxRepository = outboxRepository;
        this.rabbitMQService = rabbitMQService;
    }
    addMessage$(payload, messageType) {
        return (0, rxjs_1.of)(this.outboxRepository.create({
            payload,
            messageType,
            status: 'unsent',
        })).pipe((0, operators_1.map)((message) => this.saveMessage$(message)));
    }
    sendMessages$() {
        return (0, rxjs_1.from)(this.outboxRepository.find({ where: { status: 'unsent' } })).pipe((0, operators_1.concatMap)((messages) => messages), (0, operators_1.concatMap)((message) => this.sendMessage$(message)), (0, operators_1.concatMap)((message) => this.saveMessage$(message)));
    }
    sendMessage$(message) {
        return (0, rxjs_1.from)(this.rabbitMQService.sendMessage(message.payload, message.messageType)).pipe((0, operators_1.map)(() => (Object.assign(Object.assign({}, message), { status: 'sent' }))), (0, operators_1.catchError)(() => (0, rxjs_1.of)(Object.assign(Object.assign({}, message), { status: 'failed' }))));
    }
    saveMessage$(message) {
        return (0, rxjs_1.from)(this.outboxRepository.save(message));
    }
};
OutboxService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(outbox_model_1.OutboxModel)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        rmq_service_adapter_1.RmqServiceAdapter])
], OutboxService);
exports.OutboxService = OutboxService;
//# sourceMappingURL=outbox.service.js.map