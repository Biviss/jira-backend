import { Injectable, Logger } from '@nestjs/common';
import * as sgMail from '@sendgrid/mail';

@Injectable()
export class NotificationService {
  private readonly logger = new Logger(NotificationService.name);

  constructor() {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  }

  async sendTaskUpdateNotification(recipientEmail: string, taskTitle: string, taskStatus: string): Promise<void> {
    const msg = {
      to: recipientEmail,
      from: process.env.SENDER,
      subject: `Update on Task: ${taskTitle}`,
      text: `The status of the task "${taskTitle}" has been updated to "${taskStatus}".`,
    };

    try {
      await sgMail.send(msg);
      this.logger.log(`Notification sent to ${recipientEmail}`);
    } catch (error) {
      this.logger.error(`Failed to send email to ${recipientEmail}`, error);
      throw new Error('Email sending failed');
    }
  }

  async sendNewCommentNotification(recipientEmail: string, taskTitle: string, comment: string): Promise<void> {
    const msg = {
      to: recipientEmail,
      from: process.env.SENDER,
      subject: `New Comment on Task: ${taskTitle}`,
      text: `A new comment was added to the task "${taskTitle}":\n\n${comment}`,
    };

    try {
      await sgMail.send(msg);
      this.logger.log(`Notification sent to ${recipientEmail}`);
    } catch (error) {
      this.logger.error(`Failed to send email to ${recipientEmail}`, error);
      throw new Error('Email sending failed');
    }
  }

  async sendTaskAssignmentNotification(recipientEmail: string, taskTitle: string): Promise<void> {
    const msg = {
      to: recipientEmail,
      from: process.env.SENDER,
      subject: `You have been assigned to Task: ${taskTitle}`,
      text: `You have been assigned to the task "${taskTitle}".`,
    };

    try {
      await sgMail.send(msg);
      this.logger.log(`Notification sent to ${recipientEmail}`);
    } catch (error) {
      this.logger.error(`Failed to send email to ${recipientEmail}`, error);
      throw new Error('Email sending failed');
    }
  }
}
