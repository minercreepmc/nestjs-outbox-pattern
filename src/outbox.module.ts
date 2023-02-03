import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { TypeOrmDynamicModule } from './database';
import { RmqModule, RmqModuleConfig } from './message-broker';
import { OutboxModel } from './outbox.model';
import { OutboxService } from './outbox.service';

export interface OutboxModuleOptions {
  rmqClientName: string | symbol;
  rmqConfig: RmqModuleConfig;
  typeOrmConfig: TypeOrmModuleOptions;
}

@Module({})
export class OutboxModule {
  static forRoot(options: OutboxModuleOptions): DynamicModule {
    const { typeOrmConfig, rmqClientName, rmqConfig } = options;
    return {
      module: OutboxModule,
      imports: [
        RmqModule.register(rmqClientName, rmqConfig),
        TypeOrmDynamicModule.forRoot(typeOrmConfig),
        TypeOrmDynamicModule.forFeature([OutboxModel]),
      ],
      providers: [OutboxService],
      exports: [OutboxService],
    };
  }
}
