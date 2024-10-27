import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, OneToMany } from 'typeorm';
import { Project } from '../../project/entities/project.entity'
import { Task } from '../../task/entities/task.entity'
import { Comment } from '../../comment/entities/comment.entity';

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

  @ApiProperty({ type: () => [Project]})
  @OneToMany(() => Project, (project) => project.creator, { cascade: true })
  projectsCreator: Project[];

  @ManyToMany(() => Project, (project) => project.executors)
  projectsExecutor: Project[];

  @ManyToMany(() => Task, (task) => task.executors)
  tasks: Task[];

  @OneToMany(() => Comment, (comment) => comment.author)
  comments: Comment[];
}