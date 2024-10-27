import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsDate, IsEnum } from 'class-validator';

export class UpdateTaskDto {
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

  @ApiProperty({example: '2024-10-15'})
  @IsDate()
  @IsNotEmpty()
  deadline: Date;

  @ApiProperty({example: 'Medium'})
  @IsEnum(['Low', 'Medium', 'High'])
  @IsNotEmpty()
  priority: string;
}
