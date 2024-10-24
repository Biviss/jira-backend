import { Controller, Post, Query } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('notifications')
@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @ApiOperation({summary: 'Send a message for task status be updated'})
  @ApiResponse({example: { message: 'Task update notification sent' }})
  @Post('task-update')
  async notifyTaskUpdate(@Query('email') email: string, @Query('taskTitle') taskTitle: string, @Query('taskStatus') taskStatus: string) {
    await this.notificationService.sendTaskUpdateNotification(
      email,
      taskTitle,
      taskStatus,
    );
    return { message: 'Task update notification sent' };
  }

  @ApiOperation({summary: 'A message for new task commit be added'})
  @ApiResponse({example: { message: 'New comment notification sent' }})
  @Post('new-comment')
  async notifyNewComment(@Query('email') email: string, @Query('taskTitle') taskTitle: string, @Query('comment') comment: string) {
    await this.notificationService.sendNewCommentNotification(
      email,
      taskTitle,
      comment,
    );
    return { message: 'New comment notification sent' };
  }

  @ApiOperation({summary: 'A message for Task assignment'})
  @ApiResponse({example: { message: 'Task assignment notification sent' }})
  @Post('task-assignment')
  async notifyTaskAssignment(@Query('email') email: string, @Query('taskTitle') taskTitle: string) {
    await this.notificationService.sendTaskAssignmentNotification(email, taskTitle);
    return { message: 'Task assignment notification sent' };
  }
}
