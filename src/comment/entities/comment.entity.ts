import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from '../../auth/entities/user.entity';
import { Task } from '../../task/entities/task.entity';

@Entity()
export class Comment {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'This is a comment.' })
  @Column()
  text: string;

  @ApiProperty({ type: () => User })
  @ManyToOne(() => User, (user) => user.comments, { onDelete: 'CASCADE' })
  author: User;

  @ApiProperty({ type: () => Task })
  @ManyToOne(() => Task, (task) => task.comments, { onDelete: 'CASCADE' })
  task: Task;

  @ApiProperty({ example: '2024-10-23' })
  @CreateDateColumn()
  createdAt: Date;
}