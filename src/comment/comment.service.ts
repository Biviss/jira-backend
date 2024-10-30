import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { User } from '../auth/entities/user.entity';
import { Task } from '../task/entities/task.entity';
import { Notification } from 'src/notification/entities/notification.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>,
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>
  ) {}

  async createComment(text: string, author: User, task: Task): Promise<Comment> {
    const comment = this.commentRepository.create({ text, author, task });

    const taskWithProject = await this.taskRepository.findOne({where: { id: task.id }, relations: ['project']});
    const notification = new Notification();
    notification.type = 'COMMENT';
    notification.usersId = [author.id]; 
    notification.projectId = taskWithProject.id;
    notification.taskId = task.id;
    notification.subject = `New comment on task ${task.title}`;
    notification.text = `${author.email} commented: "${text}"`;
    await this.notificationRepository.save(notification);

    return this.commentRepository.save(comment);
  }

  async getCommentById(id: number): Promise<Comment> {
    const comment = await this.commentRepository.findOne({ where: { id }, relations: ['author', 'task'] });
    if (!comment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }
    return comment;
  }

  async getCommentsByTask(taskId: number): Promise<Comment[]> {
    return this.commentRepository.find({ where: { task: { id: taskId } }, relations: ['author'] });
  }

  async updateComment(id: number, text: string): Promise<Comment> {
    const comment = await this.getCommentById(id);
    comment.text = text;
    return this.commentRepository.save(comment);
  }

  async deleteComment(id: number): Promise<void> {
    const result = await this.commentRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }
  }
}