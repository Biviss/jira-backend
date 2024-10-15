import { Controller, Get, Patch, Body, Param } from '@nestjs/common';
import { BoardService } from './board.service';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { Task } from '../task/entities/task.entity';
import { ApiOperation, ApiProperty, ApiResponse } from '@nestjs/swagger';

export class TaskResponse {
  @ApiProperty({ type: [Task]})
  Backlog: Task[];

  @ApiProperty({ type: [Task]})
  'To Do': Task[];

  @ApiProperty({ type: [Task]})
  'In Progress': Task[];

  @ApiProperty({ type: [Task]})
  Done: Task[];
}

@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @ApiOperation({summary: 'Get all tasks by status'})
  @ApiResponse({type: TaskResponse})
  @Get()
  getAllTasks(): Promise<Record<string, Task[]>> {
    return this.boardService.getAllTasks();
  }

  @ApiOperation({summary: 'Update the task status by id'})
  @ApiResponse({type: Task})
  @Patch(':id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
  ): Promise<Task> {
    return this.boardService.updateTaskStatus(+id, updateTaskStatusDto);
  }
}
