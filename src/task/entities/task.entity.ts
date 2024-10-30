import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { Project } from '../../project/entities/project.entity'
import { User } from '../../auth/entities/user.entity';
import { Comment } from '../../comment/entities/comment.entity';
import { Subtask } from 'src/subtask/entities/subtask.entity';

@Entity()
export class Task {
  @ApiProperty({example: 1})
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({example: 'Task1'})
  @Column()
  title: string;

  @ApiProperty({example: 'This is the Task1'})
  @Column()
  description: string;

  @ApiProperty({example: 'In Progress'})
  @Column()
  status: string;

  @ApiProperty({example: 'Task'})
  @Column()
  type: string;

  @ApiProperty({example: []})
  @ManyToMany(() => User, (user) => user.tasks)
  @JoinTable()
  executors: User[];

  @ApiProperty({ type: () => Project })
  @ManyToOne(() => Project, (project) => project.tasks, { onDelete: 'CASCADE' })
  project: Project;

  @OneToMany(() => Comment, (comment) => comment.task)
  comments: Comment[];

  @OneToMany(() => Subtask, (subtask) => subtask.task, { cascade: true })
  subtasks: Subtask[];

  @ApiProperty({example: '2024-10-15'})
  @Column()
  deadline: Date;

  @ApiProperty({example: 'Medium'})
  @Column()
  priority: string;
}
