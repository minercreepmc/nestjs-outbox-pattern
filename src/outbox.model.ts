import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class OutboxModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  payload: any;

  @Column()
  messageType: string;

  @Column()
  status: string;
}
