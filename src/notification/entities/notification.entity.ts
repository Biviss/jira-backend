import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Notification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column('json')
  usersId: number[];

  @Column()
  projectId: number;

  @Column()
  taskId: number;

  @Column()
  subject: string;

  @Column()
  text: string;
}
