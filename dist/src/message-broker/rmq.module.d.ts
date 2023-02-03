import { DynamicModule } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientOptions } from '@nestjs/microservices';
export interface RmqModuleConfig {
    user: string;
    password: string;
    host: number;
    queueName: string;
}
export declare class RmqModule {
    static register(name: string | symbol, config: RmqModuleConfig): DynamicModule;
    static registerClient(name: string | symbol, config: RmqModuleConfig): DynamicModule;
    static createOptions(configService: ConfigService, config: RmqModuleConfig): ClientOptions;
}
