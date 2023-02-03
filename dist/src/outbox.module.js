"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var OutboxModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OutboxModule = void 0;
const common_1 = require("@nestjs/common");
const database_1 = require("./database");
const message_broker_1 = require("./message-broker");
const outbox_1 = require("./outbox");
let OutboxModule = OutboxModule_1 = class OutboxModule {
    static forRoot(options) {
        const { typeOrmConfig, rmqClientName, rmqConfig, typeOrmEntites } = options;
        return {
            module: OutboxModule_1,
            providers: [
                outbox_1.OutboxService,
                message_broker_1.RmqModule.register(rmqClientName, rmqConfig),
                database_1.TypeOrmDynamicModule.forRoot(typeOrmConfig),
                database_1.TypeOrmDynamicModule.forFeature(typeOrmEntites),
            ],
            exports: [outbox_1.OutboxService],
        };
    }
};
OutboxModule = OutboxModule_1 = __decorate([
    (0, common_1.Module)({})
], OutboxModule);
exports.OutboxModule = OutboxModule;
//# sourceMappingURL=outbox.module.js.map