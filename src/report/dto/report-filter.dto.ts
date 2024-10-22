import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Project } from '../../project/entities/project.entity'

export class ReportFilterDto {
  @ApiProperty({ type: Project })
  @IsNotEmpty()
  project: Project;
}
