import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
export interface IRmqService {
    sendMessage(payload: string, messageType: string): Observable<void>;
}
export declare class RmqServiceAdapter implements IRmqService {
    private readonly clientProxy;
    constructor(clientProxy: ClientProxy);
    sendMessage(payload: string, messageType: string): Observable<any>;
}
