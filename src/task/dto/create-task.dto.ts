import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail, IsDate } from 'class-validator';

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
  @IsString()
  @IsNotEmpty()
  status: string;

  @ApiProperty({example: 'Task'})
  @IsString()
  @IsNotEmpty()
  type: string;

  @ApiProperty({example: 'user1@mail.com'})
  @IsEmail()
  @IsNotEmpty()
  executor: string;

  @ApiProperty({example: '2024-10-15'})
  @IsDate()
  @IsNotEmpty()
  deadline: Date;

  @ApiProperty({example: 'Medium'})
  @IsString()
  @IsNotEmpty()
  priority: string;
}
