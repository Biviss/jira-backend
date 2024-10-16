import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail, IsDate, IsEnum } from 'class-validator';

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

  @ApiProperty({example: 'user1@mail.com'})
  @IsEmail()
  @IsNotEmpty()
  executor: string;

  @ApiProperty({example: 'Project1'})
  @IsString()
  @IsNotEmpty()
  projectTitle: string;

  @ApiProperty({example: '2024-10-15'})
  @IsDate()
  @IsNotEmpty()
  deadline: Date;

  @ApiProperty({example: 'Medium'})
  @IsEnum(['Low', 'Medium', 'Hihg'])
  @IsNotEmpty()
  priority: string;
}
