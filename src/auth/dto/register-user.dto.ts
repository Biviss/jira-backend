import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { Project } from '../../project/entities/project.entity'
import { Task } from '../../task/entities/task.entity'
import { Comment } from '../../comment/entities/comment.entity';
import { Notification } from '../../notification/entities/notification.entity';

export class RegisterUserDto {
  @ApiProperty({example: 'emale@mail.com'})
  @IsEmail()
  email: string;

  @ApiProperty({example: 'adfowerngr'})
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({example: 'admin',
    enum: ['admin', 'manager', 'developer']})
  @IsEnum(['admin', 'manager', 'developer'])
  @IsNotEmpty()
  role: string;

  @IsNotEmpty()
  tasks: Task[] = [];

  @IsNotEmpty()
  comments: Comment[] = [];

  @IsNotEmpty()
  notifications: Notification[] = []

  @IsNotEmpty()
  projectsCreator: Project[] = [];

  @IsNotEmpty()
  projectsExecutor: Project[] = [];
}