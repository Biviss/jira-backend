import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { Task } from './entities/task.entity';
import { User } from '../auth/entities/user.entity';
import { Project } from '../project/entities/project.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Task, User, Project])],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
