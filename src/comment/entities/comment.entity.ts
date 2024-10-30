import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from '../../auth/entities/user.entity';
import { Task } from '../../task/entities/task.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @ManyToOne(() => User, (user) => user.comments, { onDelete: 'CASCADE' })
  author: User;

  @ManyToOne(() => Task, (task) => task.comments, { onDelete: 'CASCADE' })
  task: Task;

  @CreateDateColumn()
  createdAt: Date;
}