import { Observable } from 'rxjs';
import { OutboxModel } from './outbox.model';
import { Repository } from 'typeorm';
import { RmqServiceAdapter } from './rmq.service.adapter';
export declare class OutboxService {
    private readonly outboxRepository;
    private readonly rabbitMQService;
    constructor(outboxRepository: Repository<OutboxModel>, rabbitMQService: RmqServiceAdapter);
    addMessage$(payload: string, messageType: string): Observable<Observable<OutboxModel>>;
    sendMessages$(): Observable<OutboxModel>;
    private sendMessage$;
    private saveMessage$;
}
