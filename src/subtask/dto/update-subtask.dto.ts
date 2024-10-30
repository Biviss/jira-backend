import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class UpdateSubtaskDto {
  @ApiProperty({example: 'Subtask1'})
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({example: 'In Progress',
    enum: ['Backlog', 'To Do', 'In Progress', 'Done']})
  @IsEnum(['Backlog', 'To Do', 'In Progress', 'Done'])
  @IsOptional()
  status?: string;

  @IsOptional()
  executorEmale?: string;

  @ApiProperty({ example: 1 })
  @IsOptional()
  executorId?: number;

  @ApiProperty({example: 1})
  @IsOptional()
  taskId?: number;
}
