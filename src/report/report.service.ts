import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReportFilterDto } from './dto/report-filter.dto';
import { Task } from '../task/entities/task.entity';
import { Project } from '../project/entities/project.entity';

@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  async getProjectReport(filterDto: ReportFilterDto) {
    const { projectTitle } = filterDto;
  
    const project = await this.projectRepository.findOne({
      where: { title: projectTitle },
    });
  
    if (!project) {
      throw new Error(`Project with title ${projectTitle} not found`);
    }
  
    const tasks = await this.taskRepository.find({
      where: { projectTitle: project.title },
    });
  
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter((task) => task.status === 'Done').length;
    const progress = totalTasks > 0 ? `${(completedTasks / totalTasks) * 100}%` : '0%';
  
    return {
      projectTitle: project.title,
      totalTasks,
      completedTasks,
      progress,
    };
  }
  

  async getUserReport(userEmail: string) {
    const tasks = await this.taskRepository.find({
      where: { executor: userEmail },
    });

    const totalTasks = tasks.length;
    const completedTasks = tasks.filter((task) => task.status === 'Done').length;
    const progress = totalTasks > 0 ? `${(completedTasks / totalTasks) * 100}%` : '0%';

    return {
      userEmail,
      totalTasks,
      completedTasks,
      progress,
    };
  }

  async getTaskProgress(filterDto: ReportFilterDto) {
    const { projectTitle } = filterDto;

    const project = await this.projectRepository.findOne({
      where: { title: projectTitle },
    });

    if (!project) {
      throw new Error(`Project with title ${projectTitle} not found`);
    }

    const tasks = await this.taskRepository.find({
      where: { projectTitle: project.title },
    });

    const backlog = tasks.filter((task) => task.status === 'Backlog').length;
    const todo = tasks.filter((task) => task.status === 'To Do').length;
    const inProgress = tasks.filter((task) => task.status === 'In Progress').length;
    const done = tasks.filter((task) => task.status === 'Done').length;

    return {
      projectTitle: project.title,
      backlog,
      todo,
      inProgress,
      done,
    };
  }
}
