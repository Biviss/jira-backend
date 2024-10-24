import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail, IsDate, IsEnum } from 'class-validator';
import { Project } from '../../project/entities/project.entity'
import { User } from '../../auth/entities/user.entity'

export class CreateTaskDto {
  @ApiProperty({example: 'Task1'})
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({example: 'This is the Task1'})
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({example: 'In Progress'})
  @IsEnum(['Backlog', 'To Do', 'In Progress', 'Done'])
  @IsNotEmpty()
  status: string;

  @ApiProperty({example: 'Task'})
  @IsEnum(['Bug', 'Task', 'Epic'])
  @IsNotEmpty()
  type: string;

  @ApiProperty({example: {
    "id": 1
  }})
  @IsNotEmpty()
  project: Project;

  @ApiProperty({example: '2024-10-15'})
  @IsDate()
  @IsNotEmpty()
  deadline: Date;

  @ApiProperty({example: 'Medium'})
  @IsEnum(['Low', 'Medium', 'Hihg'])
  @IsNotEmpty()
  priority: string;

  @IsNotEmpty()
  executors: User[] = [];
}
