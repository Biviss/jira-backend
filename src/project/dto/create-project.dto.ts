import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateProjectDto {
  @ApiProperty({example: 'Project1'})
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({example: 'This is Project1'})
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({example: ['user1@mail.com','user2@mail.com']})
  @IsNotEmpty()
  participants: string[];
}