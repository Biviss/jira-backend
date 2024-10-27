import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './entities/notification.entity';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { User } from '../auth/entities/user.entity';
import { Project } from '../project/entities/project.entity';
import { Task } from '../task/entities/task.entity';
import { MailService } from '@sendgrid/mail';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class NotificationService {
  private mailService: MailService;

  constructor(
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    private configService: ConfigService,
  ) {
    this.mailService = new MailService();
    this.mailService.setApiKey(this.configService.get<string>('SENDGRID_API_KEY'));
  }

  async createNotification(createNotificationDto: CreateNotificationDto): Promise<Notification> {
    const userEntity = await this.userRepository.findOne({ where: { id: createNotificationDto.userId } });
    const projectEntity = await this.projectRepository.findOne({ where: { id: createNotificationDto.projectId } });
    const taskEntity = await this.taskRepository.findOne({ where: { id: createNotificationDto.taskId } });

    if (!userEntity || !projectEntity || !taskEntity) {
        throw new Error('User, Project, or Task not found');
    }

    const notification = this.notificationRepository.create({
        ...createNotificationDto,
        user: userEntity,
        project: projectEntity,
        task: taskEntity,
    });

    await this.notificationRepository.save(notification);
    // TODO
    // await this.sendEmail(userEntity.email, notification.subject, notification.text);
    return notification;
}


  private async sendEmail(to: string, subject: string, text: string, html?: string) {
    const msg = {
      to,
      from: this.configService.get<string>('SENDGRID_FROM_EMAIL'),
      subject,
      text,
      html,
    };

    try {
      await this.mailService.send(msg);
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Failed to send email');
    }
  }

  async findOne(id: number): Promise<Notification> {
    return this.notificationRepository.findOne({ where: { id } });
}

  async findAll(): Promise<Notification[]> {
    return this.notificationRepository.find();
  }
}
