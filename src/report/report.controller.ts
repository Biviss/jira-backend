import { Controller, Get, Query } from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportFilterDto } from './dto/report-filter.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @ApiOperation({ summary: 'Get project report' })
  @ApiResponse({ 
    schema: {
      example: {
        projectTitle: 'Project1',
        totalTasks: 2,
        completedTasks: 1,
        progress: '50%',
      },
    },
  })
  @Get('project')
  async getProjectReport(@Query() filterDto: ReportFilterDto) {
    return this.reportService.getProjectReport(filterDto);
  }

  @ApiOperation({ summary: 'Get user report' })
  @ApiResponse({ 
    schema: {
      example: {
        userEmail: 'user1@mail.com',
        totalTasks: 2,
        completedTasks: 1,
        progress: '50%',
      },
    },
  })
  @Get('user')
  async getUserReport(@Query('userEmail') userEmail: string) {
    return this.reportService.getUserReport(userEmail);
  }

  @ApiOperation({ summary: 'Get task progress for a project' })
  @ApiResponse({ 
    schema: {
      example: {
        projectTitle: 'Project1',
        backlog: 0,
        todo: 0,
        inProgress: 1,
        done: 1,
      },
    },
  })
  @Get('task-progress')
  async getTaskProgress(@Query() filterDto: ReportFilterDto) {
    return this.reportService.getTaskProgress(filterDto);
  }
}
