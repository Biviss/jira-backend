import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification } from './entities/notification.entity';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { AuthModule } from '../auth/auth.module';
import { User } from '../auth/entities/user.entity';
import { Project } from '../project/entities/project.entity';
import { Task } from '../task/entities/task.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Notification, User, Project, Task]),
    AuthModule,
  ],
  controllers: [NotificationController],
  providers: [NotificationService],
})
export class NotificationModule {}
