import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { Project } from '../project/entities/project.entity'
import { User } from '../auth/entities/user.entity';
import { Subtask } from '../subtask/entities/subtask.entity';


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
      throw new NotFoundException(`Project with ID ${createTaskDto.project.id} not found`);
    }
  
    const task = this.taskRepository.create({...createTaskDto, project});
  
    const savedTask = await this.taskRepository.save(task);
    project.tasks.push(savedTask);
    await this.projectRepository.save(project);
    return savedTask;
  }  

  async getSubtasks(taskId: number): Promise<Subtask[]> {
    const task = await this.taskRepository.findOne({ where: { id: taskId }, relations: ['subtasks'] });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return task.subtasks;
  }

  async findAll(): Promise<Task[]> {
    return this.taskRepository.find({ relations: ['project', 'executors', 'comments', 'subtasks'] });
  }

  async findOne(id: number): Promise<Task> {
    return this.taskRepository.findOne({where: { id }, relations: ['project', 'executors', 'comments', 'subtasks']});
  }

  async update(id: number, dto: UpdateTaskDto): Promise<Task> {
    const existingTask = await this.taskRepository.findOne({ where: { id } });
    if (!existingTask) {
      throw new NotFoundException('Task not found');
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
    const task = await this.taskRepository.findOne({ 
        where: { id: taskId }, 
        relations: ['executors', 'project', 'project.executors']
    });
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

    const project = task.project;
    if (project && !project.executors.find(executor => executor.id === userId)) {
        project.executors.push(user);
    }

    await this.taskRepository.save(task);
    await this.userRepository.save(user);
    await this.projectRepository.save(project);
}

async removeExecutorFromTask(taskId: number, executorId: number): Promise<Task> {
  const task = await this.taskRepository.findOne({
      where: { id: taskId },
      relations: ['executors', 'project', 'project.executors', 'project.tasks', 'project.tasks.executors'],
  });

  if (!task) {
      throw new NotFoundException(`Task with ID ${taskId} not found`);
  }

  if (!task.project) {
      throw new NotFoundException(`Project associated with Task ID ${taskId} not found`);
  }

  const executorToRemove = task.executors.find(executor => executor.id === executorId);
  if (!executorToRemove) {
      throw new NotFoundException(`Executor with ID ${executorId} not found in this task`);
  }

  task.executors = task.executors.filter(executor => executor.id !== executorId);
  await this.taskRepository.save(task);

  const isExecutorInOtherTasks = task.project.tasks
      .filter(otherTask => otherTask.id !== task.id)
      .some(otherTask => 
          otherTask.executors && 
          otherTask.executors.some(executor => executor.id === executorId)
      );

      const executor = await this.userRepository.findOne({
        where: { id: executorId },
        relations: ['projectsExecutor'],
    });

  if (!isExecutorInOtherTasks) {
      task.project.executors = task.project.executors.filter(executor => executor.id !== executorId);
      await this.projectRepository.save(task.project);

      if (executor && executor.projectsExecutor) {
        executor.projectsExecutor = executor.projectsExecutor.filter(proj => proj.id !== task.project.id);
        await this.userRepository.save(executor);
    }
  }

  return task;
}
}
