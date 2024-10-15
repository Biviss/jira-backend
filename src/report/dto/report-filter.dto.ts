import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class ReportFilterDto {
  @ApiProperty({ example: 'Project1' })
  @IsString()
  @IsNotEmpty()
  projectTitle: string;
}
