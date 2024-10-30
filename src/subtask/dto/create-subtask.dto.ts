import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateSubtaskDto {
  @ApiProperty({example: 'Subtask1'})
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({example: 'In Progress',
    enum: ['Backlog', 'To Do', 'In Progress', 'Done']})
  @IsEnum(['Backlog', 'To Do', 'In Progress', 'Done'])
  @IsNotEmpty()
  status: string;

  @IsOptional()
  executorEmaile?: string;

  @IsOptional()
  executorId?: number;

  @ApiProperty({example: 1})
  @IsNotEmpty()
  taskId: number;
}
