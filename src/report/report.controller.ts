import { Controller, Get, Query } from '@nestjs/common';
import { ReportService } from './report.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('report')
@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @ApiOperation({ summary: 'Get project report' })
  @ApiResponse({ 
    schema: {
      example: {
        projectTitle: 'Project1',
        totalTasks: 2,
        backlog: 0,
        todo: 0,
        inProgress: 1,
        done: 1,
        progress: '50%',
      },
    },
  })
  @Get('project')
  async getProjectReport(@Query('pojectId') projectId: number) {
    return this.reportService.getProjectReport(projectId);
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
  async getUserReport(@Query('userId') id: number) {
    return this.reportService.getUserReport(id);
  }
}
