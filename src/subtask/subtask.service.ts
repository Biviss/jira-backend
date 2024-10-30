import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subtask } from './entities/subtask.entity';
import { CreateSubtaskDto } from './dto/create-subtask.dto'
import { UpdateSubtaskDto } from './dto/update-subtask.dto';
import { Task } from 'src/task/entities/task.entity';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class SubtaskService {
  constructor(
    @InjectRepository(Subtask)
    private readonly subtaskRepository: Repository<Subtask>,
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async create(createSubtaskDto: CreateSubtaskDto): Promise<Subtask> {
    const task = await this.taskRepository.findOne({where: { id: createSubtaskDto.taskId }, relations: ['subtasks']});
    const executor = await this.userRepository.findOne({where: { id: createSubtaskDto.executorId }});

    if (!executor) {
      throw new NotFoundException(`Executor with id ${createSubtaskDto.executorId} not found`);
    }

    const subtask = this.subtaskRepository.create({...createSubtaskDto, executorEmail: executor.email});
    task.subtasks.push(subtask);
    await this.taskRepository.save(task);
    return this.subtaskRepository.save(subtask);
  }
  

  async findAll(): Promise<Subtask[]> {
    return this.subtaskRepository.find({relations: ['task']});
  }

  async findOne(id: number): Promise<Subtask> {
    return this.subtaskRepository.findOne({ where: { id }, relations: ['task']});
  }

  async update(id: number, dto: UpdateSubtaskDto): Promise<Subtask> {
    const executor = await this.userRepository.findOne({ where: { id: dto.executorId } });
    if (executor) {
      dto.executorEmail = executor.email;
    }
  
    await this.subtaskRepository.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.subtaskRepository.delete(id);
  }
}
