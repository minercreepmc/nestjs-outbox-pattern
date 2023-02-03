import { Module } from '@nestjs/common';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { TypeOrmDynamicModule } from './database';
import { RmqModule, RmqModuleConfig } from './message-broker';
import { OutboxService } from './outbox.service';

export interface OutboxModuleOptions {
  rmqClientName: string;
  rmqConfig: RmqModuleConfig;
  typeOrmConfig: TypeOrmModuleOptions;
  typeOrmEntites: any[];
}

@Module({})
export class OutboxModule {
  static forRoot(options: OutboxModuleOptions) {
    const { typeOrmConfig, rmqClientName, rmqConfig, typeOrmEntites } = options;
    return {
      module: OutboxModule,
      providers: [
        OutboxService,
        RmqModule.register(rmqClientName, rmqConfig),
        TypeOrmDynamicModule.forRoot(typeOrmConfig),
        TypeOrmDynamicModule.forFeature(typeOrmEntites),
      ],
      exports: [OutboxService],
    };
  }
}
