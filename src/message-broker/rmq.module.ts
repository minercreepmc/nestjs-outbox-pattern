import { DynamicModule, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientOptions, ClientsModule, Transport } from '@nestjs/microservices';
import { RmqService } from './rmq.service';

export interface RmqModuleConfig {
  user: string;
  password: string;
  host: number;
  queueName: string;
}

@Module({
  providers: [RmqService],
  exports: [RmqService],
})
export class RmqModule {
  static register(
    name: string | symbol,
    config: RmqModuleConfig,
  ): DynamicModule {
    return {
      module: RmqModule,
      exports: [ClientsModule],
      imports: [RmqModule.registerClient(name, config)],
    };
  }

  static registerClient(
    name: string | symbol,
    config: RmqModuleConfig,
  ): DynamicModule {
    return ClientsModule.registerAsync([
      {
        name,
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => {
          return RmqModule.createOptions(configService, config);
        },
      },
    ]);
  }

  static createOptions(
    configService: ConfigService,
    config: RmqModuleConfig,
  ): ClientOptions {
    const user = config.user || configService.get('RABBITMQ_USER');
    const password = config.password || configService.get('RABBITMQ_PASSWORD');
    const host = config.host || configService.get('RABBITMQ_HOST');
    const queueName =
      config.queueName || configService.get('RABBITMQ_QUEUE_NAME');

    return {
      transport: Transport.RMQ,
      options: {
        urls: [`amqp://${user}:${password}@${host}`],
        queue: queueName,
      },
    };
  }
}
