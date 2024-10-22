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
    const { project } = filterDto;

    const foundProject = await this.projectRepository.findOne({
      where: { id: project.id },
    });

    if (!foundProject) {
      throw new Error(`Project with id ${project.id} not found`);
    }

    const tasks = await this.taskRepository.find({
      where: { project: { id: foundProject.id } },
    });

    const totalTasks = tasks.length;
    const completedTasks = tasks.filter((task) => task.status === 'Done').length;
    const progress = totalTasks > 0 ? `${(completedTasks / totalTasks) * 100}%` : '0%';

    return {
      projectTitle: foundProject.title,
      totalTasks,
      completedTasks,
      progress,
    };
  }

  async getUserReport(userEmail: string) {
    return {data: 'TODO'}
    // const tasks = await this.taskRepository.find({
    //   where: { executors: userEmail },
    // });

    // const totalTasks = tasks.length;
    // const completedTasks = tasks.filter((task) => task.status === 'Done').length;
    // const progress = totalTasks > 0 ? `${(completedTasks / totalTasks) * 100}%` : '0%';

    // return {
    //   userEmail,
    //   totalTasks,
    //   completedTasks,
    //   progress,
    // };
  }

  async getTaskProgress(filterDto: ReportFilterDto) {
    const { project } = filterDto;

    const foundProject = await this.projectRepository.findOne({
      where: { id: project.id },
    });

    if (!foundProject) {
      throw new Error(`Project with id ${project.id} not found`);
    }

    const tasks = await this.taskRepository.find({
      where: { project: { id: foundProject.id } },
    });

    const backlog = tasks.filter((task) => task.status === 'Backlog').length;
    const todo = tasks.filter((task) => task.status === 'To Do').length;
    const inProgress = tasks.filter((task) => task.status === 'In Progress').length;
    const done = tasks.filter((task) => task.status === 'Done').length;

    return {
      projectTitle: foundProject.title,
      backlog,
      todo,
      inProgress,
      done,
    };
  }
}
