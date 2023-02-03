import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RmqOptions, Transport } from '@nestjs/microservices';

@Injectable()
export class RmqService {
  constructor(private readonly configService: ConfigService) {}

  getOptions(noAck = false): RmqOptions {
    const user = this.configService.get('RABBITMQ_USER');
    const password = this.configService.get('RABBITMQ_PASSWORD');
    const host = this.configService.get('RABBITMQ_HOST');
    const queueName = this.configService.get('RABBITMQ_QUEUE_NAME');
    return {
      transport: Transport.RMQ,
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
}
