import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { Project } from '../../project/entities/project.entity'
import { Task } from '../../task/entities/task.entity'

@Entity()
export class User {
  @ApiProperty({example: 1})
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({example: 'emale@mail.com'})
  @Column({ unique: true })
  email: string;

  @ApiProperty({example: 'adfowerngr'})
  @Column()
  password: string;

  @ApiProperty({example: 'admin'})
  @Column()
  role: string;

  @ManyToMany(() => Project, (project) => project.executors)
  projects: Project[];

  @ManyToMany(() => Task, (task) => task.executors)
  tasks: Task[];
}