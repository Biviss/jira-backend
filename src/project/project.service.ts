import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { Project } from './entities/project.entity';
import { User } from '../auth/entities/user.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async create(dto: CreateProjectDto): Promise<Project> {
    const project = this.projectRepository.create(dto);
    return this.projectRepository.save(project);
  }

  async findAll(): Promise<Project[]> {
    return this.projectRepository.find({ relations: ['tasks', 'executors'] });
  }

  async findOne(id: number): Promise<Project> {
    const project = await this.projectRepository.findOne({where: { id }, relations: ['tasks', 'executors']});
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
  
    const user = await this.userRepository.findOne({ where: { id: userId }, relations: ['projects'] });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
  
    if (!project.executors.find((executor) => executor.id === userId)) {
      project.executors.push(user);
    }
  
    if (!user.projects.find((proj) => proj.id === projectId)) {
      user.projects.push(project);
    }
  
    await this.projectRepository.save(project);
    await this.userRepository.save(user);
  }
}

