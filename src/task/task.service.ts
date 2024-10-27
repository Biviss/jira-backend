import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
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
    const project = await this.projectRepository.findOne({
      where: { id: createTaskDto.project.id },
      relations: ['tasks'],
    });
  
    if (!project) {
      throw new Error(`Project with ID ${createTaskDto.project.id} not found`);
    }
  
    const task = this.taskRepository.create({
      title: createTaskDto.title,
      description: createTaskDto.description,
      status: createTaskDto.status,
      type: createTaskDto.type,
      priority: createTaskDto.priority,
      deadline: createTaskDto.deadline,
      project: project,
      executors: createTaskDto.executors.map(user => ({ id: user.id })),
      comments: createTaskDto.comments.map(comment => ({ id: comment.id })),
    });
  
    const savedTask = await this.taskRepository.save(task);
    project.tasks.push(savedTask);
    return savedTask;
  }  

  async findAll(): Promise<Task[]> {
    return this.taskRepository.find({ relations: ['project', 'executors', 'comments'] });
  }

  async findOne(id: number): Promise<Task> {
    return this.taskRepository.findOne({where: { id }, relations: ['project', 'executors', 'comments']});
  }

  async update(id: number, dto: UpdateTaskDto): Promise<Task> {
    const existingTask = await this.taskRepository.findOne({ where: { id } });
    if (!existingTask) {
      throw new Error('Task not found');
    }

    const updatedTask = {
      ...existingTask,
      ...dto,
    };

    await this.taskRepository.save(updatedTask);
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

  async removeExecutorFromTask(taskId: number, executorId: number): Promise<Task> {
    const task = await this.taskRepository.findOne({
      where: { id: taskId },
      relations: ['executors'],
    });

    if (!task) {
      throw new NotFoundException(`Task with ID ${taskId} not found`);
    }

    const executorToRemove = task.executors.find(executor => executor.id === executorId);
    if (!executorToRemove) {
      throw new NotFoundException(`Executor with ID ${executorId} not found in this task`);
    }

    task.executors = task.executors.filter(executor => executor.id !== executorId);
    await this.taskRepository.save(task);

    const executor = await this.userRepository.findOne({
      where: { id: executorId },
      relations: ['projectsExecutor'],
    });

    if (executor) {
      executor.projectsExecutor = executor.projectsExecutor.filter(proj => proj.id !== task.project.id);
      await this.userRepository.save(executor);
    }

    return task;
  }
}
