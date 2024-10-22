import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './entities/task.entity';
import { Project } from '../project/entities/project.entity'
import { User } from '../auth/entities/user.entity';


@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const project = await this.projectRepository.findOne({where: { id: createTaskDto.project.id }, relations: ['tasks']});
    if (!project) {
      throw new Error(`Project with ID ${createTaskDto.project.id} not found`);
    }
    const task = this.taskRepository.create({
      ...createTaskDto,
      project,
    });
    const savedTask = await this.taskRepository.save(task);
    project.tasks.push(savedTask);
    await this.projectRepository.save(project);
    return savedTask;
  }

  async findAll(): Promise<Task[]> {
    return this.taskRepository.find({ relations: ['project', 'executors'] });
  }

  async findOne(id: number): Promise<Task> {
    return this.taskRepository.findOne({where: { id }, relations: ['project', 'executors']});
  }

  async update(id: number, dto: CreateTaskDto): Promise<Task> {
    await this.taskRepository.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.taskRepository.delete(id);
  }

  async addExecutorToTask(taskId: number, userId: number): Promise<void> {
    const task = await this.taskRepository.findOne({ where: { id: taskId }, relations: ['executors'] });
    if (!task) {
      throw new NotFoundException(`Task with ID ${taskId} not found`);
    }

    const user = await this.userRepository.findOne({ where: { id: userId }, relations: ['tasks'] });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    if (!task.executors.find(executor => executor.id === userId)) {
      task.executors.push(user);
    }

    if (!user.tasks.find(task => task.id === taskId)) {
      user.tasks.push(task);
    }

    await this.taskRepository.save(task);
    await this.userRepository.save(user);
  }
}
