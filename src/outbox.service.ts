import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable, of } from 'rxjs';
import { concatMap, map, catchError } from 'rxjs/operators';
import { OutboxModel } from './outbox.model';
import { Repository } from 'typeorm';
import { RmqServiceAdapter } from './rmq.service.adapter';

@Injectable()
export class OutboxService {
  constructor(
    @InjectRepository(OutboxModel)
    private readonly outboxRepository: Repository<OutboxModel>,
    private readonly rabbitMQService: RmqServiceAdapter,
  ) {}

  addMessage$(payload: any, messageType: string) {
    return of(
      this.outboxRepository.create({
        payload,
        messageType,
        status: 'unsent',
      }),
    ).pipe(map((message) => this.saveMessage$(message)));
  }

  sendMessages$(): Observable<OutboxModel> {
    return from(
      this.outboxRepository.find({ where: { status: 'unsent' } }),
    ).pipe(
      concatMap((messages) => messages),
      concatMap((message) => this.sendMessage$(message)),
      concatMap((message) => this.saveMessage$(message)),
    );
  }

  private sendMessage$(message: OutboxModel): Observable<OutboxModel> {
    return from(
      this.rabbitMQService.sendMessage(message.payload, message.messageType),
    ).pipe(
      map(() => ({ ...message, status: 'sent' })),
      catchError(() => of({ ...message, status: 'failed' })),
    );
  }
  private saveMessage$(message: OutboxModel): Observable<OutboxModel> {
    return from(this.outboxRepository.save(message));
  }
}
