import { Controller, Get, Patch, Body, Param } from '@nestjs/common';
import { BoardService } from './board.service';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { Task } from '../task/entities/task.entity';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('board')
@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @ApiOperation({summary: 'Get all tasks by status'})
  @ApiResponse({schema: {
    example: {
      "Backlog": [],
      "To Do": [],
      "In Progress": [
        {
          "id": 1,
          "title": "Task1",
          "description": "This is the Task1",
          "status": "In Progress",
          "type": "Task",
          "executor": "user1@mail.com",
          "projectTitle": "Project1",
          "deadline": "2024-10-14T21:00:00.000Z",
          "priority": "Medium"
        }
      ],
      "Done": [
        {
          "id": 2,
          "title": "Task2",
          "description": "This is the Task2",
          "status": "Done",
          "type": "Task",
          "executor": "user1@mail.com",
          "projectTitle": "Project1",
          "deadline": "2024-10-14T21:00:00.000Z",
          "priority": "Medium"
        }
      ]
    },
  }})
  @Get(':id')
  getAllTasks(@Param('id') id: number): Promise<Record<string, Task[]>> {
    return this.boardService.getAllTasks(id);
  }

  @ApiOperation({summary: 'Update the task status by id'})
  @ApiResponse({type: Task})
  @Patch(':id/status')
  updateTaskStatus(
    @Param('id') id: number,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
  ): Promise<Task> {
    return this.boardService.updateTaskStatus(id, updateTaskStatusDto);
  }
}
