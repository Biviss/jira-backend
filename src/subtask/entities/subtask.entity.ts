import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Task } from '../../task/entities/task.entity';

@Entity()
export class Subtask {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Subtask 1' })
  @Column()
  title: string;

  @ApiProperty({ example: 'user1@mail.com' })
  @Column()
  executorEmale: string;

  @ApiProperty({ example: 1 })
  @Column()
  executorId: number;

  @ApiProperty({ example: 'In Progress' })
  @Column()
  status: string;

  @ManyToOne(() => Task, (task) => task.subtasks, { onDelete: 'CASCADE' })
  task: Task;
}
