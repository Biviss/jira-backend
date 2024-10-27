import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { User } from '../auth/entities/user.entity';
import { Task } from '../task/entities/task.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  async createComment(text: string, author: User, task: Task): Promise<Comment> {
    const comment = this.commentRepository.create({ text, author, task });
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