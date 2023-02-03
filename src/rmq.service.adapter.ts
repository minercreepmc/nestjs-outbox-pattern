import { Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

export interface IRmqService {
  sendMessage(payload: string, messageType: string): Observable<void>;
}

@Injectable()
export class RmqServiceAdapter implements IRmqService {
  constructor(private readonly clientProxy: ClientProxy) {}

  sendMessage(payload: string, messageType: string): Observable<any> {
    return this.clientProxy.emit(messageType, payload);
  }
}
