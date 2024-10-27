import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable, ManyToOne } from 'typeorm';
import { Task } from '../../task/entities/task.entity'
import { User } from '../../auth/entities/user.entity'
import { Notification } from '../../notification/entities/notification.entity';


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

  @ApiProperty({ type: () => User })
  @ManyToOne(() => User, (user) => user.projectsCreator, { onDelete: 'CASCADE' })
  creator: User;

  @ApiProperty({example: []})
  @ManyToMany(() => User, (user) => user.projectsExecutor)
  @JoinTable()
  executors: User[];

  @ApiProperty({ type: () => [Task]})
  @OneToMany(() => Task, (task) => task.project, { cascade: true })
  tasks: Task[];

  @OneToMany(() => Notification, notification => notification.project)
  notifications: Notification[];
}