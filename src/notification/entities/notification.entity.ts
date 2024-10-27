import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../../auth/entities/user.entity';
import { Project } from '../../project/entities/project.entity';
import { Task } from '../../task/entities/task.entity';

@Entity()
export class Notification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @ManyToOne(() => User, (user) => user.notifications, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Project, (project) => project.notifications, { onDelete: 'CASCADE' })
  project: Project;

  @ManyToOne(() => Task, (task) => task.notifications, { onDelete: 'CASCADE' })
  task: Task;

  @Column()
  subject: string;

  @Column()
  text: string;
}
