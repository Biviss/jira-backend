import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '../task/entities/task.entity';
import { Project } from '../project/entities/project.entity';
import { User } from '../auth/entities/user.entity'

@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async getProjectReport(projectId: number) {
    const project = await this.projectRepository.findOne({where: { id: projectId }, relations: ['executors', 'tasks']});
    const projectTitle = project.title;
    const totalTasks = project.tasks.length;
    const completedTasks = project.tasks.filter((task) => task.status === 'Done').length;
    const backlog = project.tasks.filter((task) => task.status === 'Backlog').length;
    const todo = project.tasks.filter((task) => task.status === 'To Do').length;
    const inProgress = project.tasks.filter((task) => task.status === 'In Progress').length;
    const done = project.tasks.filter((task) => task.status === 'Done').length;
    const progress = totalTasks > 0 ? `${(completedTasks / totalTasks) * 100}%` : '0%';

    return {
      projectTitle,
      totalTasks,
      backlog,
      todo,
      inProgress,
      done,
      progress
    };
  }

  async getUserReport(userId: number) {
    const user = await this.userRepository.findOne({where: { id: userId }, relations: ['projects', 'tasks']});
    const userEmale = user.email;
    const totalTasks = user.tasks.length;
    const totalProjects = user.projects.length;
    const completedTasks = user.tasks.filter((task) => task.status === 'Done').length;
    const progressTasks = totalTasks > 0 ? `${(completedTasks / totalTasks) * 100}%` : '0%';

    return {
      userEmale,
      totalProjects,
      totalTasks,
      completedTasks,
      progressTasks
    };
  }
}
