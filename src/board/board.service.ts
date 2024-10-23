import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '../task/entities/task.entity';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async getAllTasks(): Promise<Record<string, Task[]>> {
    const tasks = await this.taskRepository.find();
    return {
      Backlog: tasks.filter(task => task.status === 'Backlog'),
      'To Do': tasks.filter(task => task.status === 'To Do'),
      'In Progress': tasks.filter(task => task.status === 'In Progress'),
      Done: tasks.filter(task => task.status === 'Done'),
    };
  }

  async updateTaskStatus(id: number, updateTaskStatusDto: UpdateTaskStatusDto): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id } });

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    task.status = updateTaskStatusDto.status;

    await this.taskRepository.save(task);
    return task;
  }
}
