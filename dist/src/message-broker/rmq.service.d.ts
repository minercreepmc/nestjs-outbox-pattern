import { ConfigService } from '@nestjs/config';
import { RmqOptions } from '@nestjs/microservices';
export declare class RmqService {
    private readonly configService;
    constructor(configService: ConfigService);
    getOptions(noAck?: boolean): RmqOptions;
}
