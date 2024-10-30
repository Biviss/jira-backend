import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { Notification } from 'src/notification/entities/notification.entity';
import { Task } from 'src/task/entities/task.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, Notification, Task]),],
  providers: [CommentService],
  controllers: [CommentController],
  exports: [CommentService],
})
export class CommentModule {}