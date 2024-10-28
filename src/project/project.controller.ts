import { Controller, Get, Post, Body, Param, Put, Delete, ParseIntPipe  } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { Project } from './entities/project.entity';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Task } from '../task/entities/task.entity';

@ApiTags('projects')
@Controller('projects')
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @ApiOperation({summary: 'Create a project'})
  @ApiResponse({type: Project})
  @Post()
  async create(@Body() dto: CreateProjectDto): Promise<Project> {
    return this.projectService.create(dto);
  }

  @ApiOperation({summary: 'Get all projects'})
  @ApiResponse({type: Project})
  @Get()
  async findAll(): Promise<Project[]> {
    return this.projectService.findAll();
  }

  @ApiOperation({summary: 'Get the project by id'})
  @ApiResponse({type: Project})
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Project> {
    return this.projectService.findOne(+id);
  }

  @ApiOperation({summary: 'Get tasks in project by id'})
  @ApiResponse({type: Task})
  @Get('/tasks/:projectId')
  async findTasks(@Param('projectId') projectId: string): Promise<Task[]> {
    return this.projectService.getAlltasksInProject(+projectId);
  }

  @ApiOperation({summary: 'Update the project by id'})
  @ApiResponse({type: Project})
  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: CreateProjectDto): Promise<Project> {
    return this.projectService.update(+id, dto);
  }

  @ApiOperation({summary: 'Delete the project by id'})
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.projectService.remove(+id);
  }

  @ApiOperation({summary: 'Add the executor to the project and vice versa'})
  @Post(':projectId/executors/:userId')
  async addExecutorToProject(
    @Param('projectId') projectId: number,
    @Param('userId') userId: number,
  ): Promise<void> {
    await this.projectService.addExecutorToProject(projectId, userId);
  }

  @Delete(':projectId/executors/:executorId')
  @ApiOperation({ summary: 'Remove executor from project' })
  async removeExecutor(
  @Param('projectId', ParseIntPipe) projectId: number,
  @Param('executorId', ParseIntPipe) executorId: number,
  ): Promise<Project> {
  return this.projectService.removeExecutorFromProject(projectId, executorId);
  }
}
