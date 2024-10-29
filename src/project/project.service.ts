import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { Project } from './entities/project.entity';
import { User } from '../auth/entities/user.entity';
import { Task } from '../task/entities/task.entity'

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async create(createProjectDto: CreateProjectDto): Promise<Project> {
    const creator = await this.userRepository.findOne({where: { id: createProjectDto.creator.id }, relations: ['projectsCreator']});
    if (!creator) {
      throw new NotFoundException(`User with ID ${createProjectDto.creator.id} not found`);
    }
    const project = this.projectRepository.create({
      ...createProjectDto,
      creator,
    });
    const savedProject = await this.projectRepository.save(project);
    creator.projectsCreator.push(savedProject);
    return savedProject;
  }

  async findAll(): Promise<Project[]> {
    return this.projectRepository.find({ relations: ['tasks', 'executors', 'creator'] });
  }

  async findOne(id: number): Promise<Project> {
    const project = await this.projectRepository.findOne({where: { id }, relations: ['tasks', 'executors', 'creator', 'tasks.executors', 'tasks.comments']});
    return project;
  }

  async update(id: number, dto: CreateProjectDto): Promise<Project> {
    await this.projectRepository.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.projectRepository.delete(id);
  }

  async addExecutorToProject(projectId: number, userId: number): Promise<void> {
    const project = await this.findOne(projectId);
    if (!project) {
      throw new NotFoundException(`Project with ID ${projectId} not found`);
    }
  
    const user = await this.userRepository.findOne({ where: { id: userId }, relations: ['projectsExecutor'] });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
  
    if (!project.executors.find((executor) => executor.id === userId)) {
      project.executors.push(user);
    }
  
    if (!user.projectsExecutor.find((proj) => proj.id === projectId)) {
      user.projectsExecutor.push(project);
    }
  
    await this.projectRepository.save(project);
    await this.userRepository.save(user);
  }

async removeExecutorFromProject(projectId: number, executorId: number): Promise<Project> {
  const project = await this.projectRepository.findOne({
    where: { id: projectId },
    relations: ['executors'], 
  });

  if (!project) {
    throw new NotFoundException(`Project with ID ${projectId} not found`);
  }

  const executorToRemove = project.executors.find(executor => executor.id === executorId);
  if (!executorToRemove) {
    throw new NotFoundException(`Executor with ID ${executorId} not found in this project`);
  }

  project.executors = project.executors.filter(executor => executor.id !== executorId);
  await this.projectRepository.save(project);

  const executor = await this.userRepository.findOne({
    where: { id: executorId },
    relations: ['projectsExecutor'],
  });

  if (executor) {
    executor.projectsExecutor = executor.projectsExecutor.filter(proj => proj.id !== projectId);
    await this.userRepository.save(executor);
  }

  return await this.findOne(projectId);
}

  async getAlltasksInProject(id: number): Promise<Task[]> {
    const project = await this.projectRepository.findOne({where: { id }, relations: ['tasks', 'executors', 'creator', 'tasks.comments.author']});
    return project.tasks;
  }
}