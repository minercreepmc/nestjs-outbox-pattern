import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { RmqModuleConfig } from './message-broker';
export interface OutboxModuleOptions {
    rmqClientName: string;
    rmqConfig: RmqModuleConfig;
    typeOrmConfig: TypeOrmModuleOptions;
    typeOrmEntites: any[];
}
export declare class OutboxModule {
    static forRoot(options: OutboxModuleOptions): {
        module: typeof OutboxModule;
        providers: any[];
        exports: any[];
    };
}
