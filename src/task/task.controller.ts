import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('tasks')
@Controller('tasks')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @ApiOperation({summary: 'Create a task'})
  @ApiResponse({type: Task})
  @Post()
  async create(@Body() dto: CreateTaskDto): Promise<Task> {
    return this.taskService.create(dto);
  }

  @ApiOperation({summary: 'Get all tasks'})
  @ApiResponse({type: Task})
  @Get()
  async findAll(): Promise<Task[]> {
    return this.taskService.findAll();
  }

  @ApiOperation({summary: 'Get the task by id'})
  @ApiResponse({type: Task})
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Task> {
    return this.taskService.findOne(+id);
  }

  @ApiOperation({summary: 'Update the task by id'})
  @ApiResponse({type: Task})
  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateTaskDto): Promise<Task> {
    return this.taskService.update(+id, dto);
  }

  @ApiOperation({summary: 'Delete the task by id'})
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.taskService.remove(+id);
  }

  @ApiOperation({summary: 'Add the executor to the task and vice versa'})
  @Post(':taskId/executors/:userId')
  async addExecutorToTask(
    @Param('taskId') taskId: number,
    @Param('userId') userId: number,
  ): Promise<void> {
    await this.taskService.addExecutorToTask(taskId, userId);
  }
}
