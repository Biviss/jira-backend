import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subtask } from './entities/subtask.entity';
import { CreateSubtaskDto } from './dto/create-subtask.dto'
import { Task } from 'src/task/entities/task.entity';

@Injectable()
export class SubtaskService {
  constructor(
    @InjectRepository(Subtask)
    private readonly subtaskRepository: Repository<Subtask>,
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>
  ) {}

  async create(createSubtaskDto: CreateSubtaskDto): Promise<Subtask> {
    const task = await this.taskRepository.findOne({where: { id: createSubtaskDto.taskId }, relations: ['subtasks']});
    const subtask = this.subtaskRepository.create(createSubtaskDto);
    task.subtasks.push(subtask)
    await this.taskRepository.save(task)
    return this.subtaskRepository.save(subtask);
  }
  

  async findAll(): Promise<Subtask[]> {
    return this.subtaskRepository.find({relations: ['task']});
  }

  async findOne(id: number): Promise<Subtask> {
    return this.subtaskRepository.findOne({ where: { id }, relations: ['task']});
  }

  async update(id: number, subtaskData: Partial<Subtask>): Promise<Subtask> {
    await this.subtaskRepository.update(id, subtaskData);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.subtaskRepository.delete(id);
  }
}
