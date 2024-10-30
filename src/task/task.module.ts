import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { Task } from './entities/task.entity';
import { User } from '../auth/entities/user.entity';
import { Project } from '../project/entities/project.entity';
import { Subtask } from 'src/subtask/entities/subtask.entity';
import { Notification } from 'src/notification/entities/notification.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Task, User, Project, Subtask, Notification])],
  controllers: [TaskController],
  providers: [TaskService],
  exports: [TypeOrmModule]
})
export class TaskModule {}
