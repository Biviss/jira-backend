import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportController } from './report.controller';
import { ReportService } from './report.service';
import { Task } from '../task/entities/task.entity';
import { Project } from '../project/entities/project.entity';
import { User } from '../auth/entities/user.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Task, Project, User])],
  controllers: [ReportController],
  providers: [ReportService],
})
export class ReportModule {}
