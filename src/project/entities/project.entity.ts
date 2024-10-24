import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { Task } from '../../task/entities/task.entity'
import { User } from '../../auth/entities/user.entity'

@Entity()
export class Project {
  @ApiProperty({example: 1})
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({example: 'Project1'})
  @Column()
  title: string;

  @ApiProperty({example: 'This is Project1'})
  @Column()
  description: string;

  @ApiProperty({example: []})
  @ManyToMany(() => User, (user) => user.projects)
  @JoinTable()
  executors: User[];

  @ApiProperty({ type: () => [Task]})
  @OneToMany(() => Task, (task) => task.project, { cascade: true })
  tasks: Task[];
}