import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './entities/notification.entity';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { MailService } from '@sendgrid/mail';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class NotificationService {
  private mailService: MailService;

  constructor(
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>,
    private configService: ConfigService,
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {
    this.mailService = new MailService();
    this.mailService.setApiKey(this.configService.get<string>('SENDGRID_API_KEY'));
  }

  async createNotification(createNotificationDto: CreateNotificationDto): Promise<Notification> {
    const notification = this.notificationRepository.create({ ...createNotificationDto });
    await this.notificationRepository.save(notification);
    return notification;
  }

  async sendNotificationEmail(id: number): Promise<void> {
    const notification = await this.findOne(id);
    if (!notification) {
      throw new NotFoundException(`Notification with ID ${id} not found`);
    }

    const sendEmailPromises = notification.usersId.map(async userId => {
      const user = await this.userRepository.findOne({ where: { id: userId } });
      if (user && user.email) {
        return this.sendEmail(user.email, notification.subject, notification.text);
      }
    });

    await Promise.all(sendEmailPromises);
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
      throw new NotFoundException('Failed to send email');
    }
  }

  async findOne(id: number): Promise<Notification> {
    return this.notificationRepository.findOne({ where: { id } });
  }

  async findAll(): Promise<Notification[]> {
    return this.notificationRepository.find();
  }
}
