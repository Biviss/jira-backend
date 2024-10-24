import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';
import { User } from '../../auth/entities/user.entity'
import { Task } from '../../task/entities/task.entity'

export class CreateProjectDto {
  @ApiProperty({example: 'Project1'})
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({example: 'This is Project1'})
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  executors: User[] = [];

  @IsNotEmpty()
  tasks: Task[] = [];
}