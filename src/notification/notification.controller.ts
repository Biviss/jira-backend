import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { Notification } from './entities/notification.entity';

@ApiTags('notifications')
@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post()
  @ApiOperation({ summary: 'Create a notification' })
  @ApiResponse({ type: Notification })
  async createNotification(@Body() createNotificationDto: CreateNotificationDto) {
    return this.notificationService.createNotification(createNotificationDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a notification by ID' })
  @ApiResponse({ type: Notification })
  async getNotification(@Param('id') id: number) {
    return this.notificationService.findOne(id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all notifications' })
  @ApiResponse({ type: Notification })
  async getAllNotifications() {
    return this.notificationService.findAll();
  }
}
