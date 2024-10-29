import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';

export class CreateNotificationDto {
  @ApiProperty({ example: 'Task Updated' })
  @IsNotEmpty()
  subject: string;

  @ApiProperty({ example: 'The task has been updated successfully.' })
  @IsNotEmpty()
  text: string;

  @ApiProperty({
    example: 'TASK_UPDATE',
    enum: ['SYSTEM', 'TASK_UPDATE', 'PROJECT_UPDATE', 'COMMENT']
  })
  @IsEnum(['SYSTEM', 'TASK_UPDATE', 'PROJECT_UPDATE', 'COMMENT'])
  type: string;

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  userId: number;

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  projectId: number;

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  taskId: number;
}
