import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsDate, IsEnum } from 'class-validator';
import { Project } from '../../project/entities/project.entity'
import { User } from '../../auth/entities/user.entity'
import { Comment } from '../../comment/entities/comment.entity';
import { Subtask } from 'src/subtask/entities/subtask.entity';

export class CreateTaskDto {
  @ApiProperty({example: 'Task1'})
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({example: 'This is the Task1'})
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({example: 'In Progress',
    enum: ['Backlog', 'To Do', 'In Progress', 'Done']})
  @IsEnum(['Backlog', 'To Do', 'In Progress', 'Done'])
  @IsNotEmpty()
  status: string;

  @ApiProperty({example: 'Task'})
  @IsEnum(['Bug', 'Task', 'Epic'])
  @IsNotEmpty()
  type: string;

  @ApiProperty({example: 1})
  @IsNotEmpty()
  project: Project;

  @IsNotEmpty()
  comments: Comment[] = [];

  @IsNotEmpty()
  subtasks: Subtask[] = [];

  @ApiProperty({example: '2024-10-15'})
  @IsDate()
  @IsNotEmpty()
  deadline: Date;

  @ApiProperty({example: 'Medium'})
  @IsEnum(['Low', 'Medium', 'High'])
  @IsNotEmpty()
  priority: string;

  @IsNotEmpty()
  executors: User[] = [];
}
