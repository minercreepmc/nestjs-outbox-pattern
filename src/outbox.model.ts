import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class OutboxModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  payload: string;

  @Column()
  messageType: string;

  @Column()
  status: string;
}
