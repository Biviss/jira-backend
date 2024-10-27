import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({ example: 'This is a comment' })
  @IsString()
  @IsNotEmpty()
  text: string;

  @ApiProperty({ example: 1, description: 'Author ID' })
  @IsNotEmpty()
  authorId: number;

  @ApiProperty({ example: 1, description: 'Task ID' })
  @IsNotEmpty()
  taskId: number;
}