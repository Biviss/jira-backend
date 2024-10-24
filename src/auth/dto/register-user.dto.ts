import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { Project } from '../../project/entities/project.entity'
import { Task } from '../../task/entities/task.entity'

export class RegisterUserDto {
  @ApiProperty({example: 'emale@mail.com'})
  @IsEmail()
  email: string;

  @ApiProperty({example: 'adfowerngr'})
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({example: 'admin'})
  @IsEnum(['admin', 'user'])
  @IsNotEmpty()
  role: string;

  @IsNotEmpty()
  tasks: Task[] = [];

  @IsNotEmpty()
  projects: Project[] = [];
}