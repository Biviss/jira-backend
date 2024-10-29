import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SubtaskService } from './subtask.service';
import { CreateSubtaskDto } from './dto/create-subtask.dto';
import { UpdateSubtaskDto } from './dto/update-subtask.dto';
import { Subtask } from './entities/subtask.entity';

@ApiTags('subtasks')
@Controller('subtasks')
export class SubtaskController {
  constructor(private readonly subtaskService: SubtaskService) {}

  @ApiOperation({ summary: 'Create a new subtask' })
  @ApiResponse({type: Subtask })
  @Post()
  create(@Body() createSubtaskDto: CreateSubtaskDto): Promise<Subtask> {
    return this.subtaskService.create(createSubtaskDto);
  }

  @ApiOperation({ summary: 'Retrieve all subtasks' })
  @ApiResponse({type: [Subtask] })
  @Get()
  findAll(): Promise<Subtask[]> {
    return this.subtaskService.findAll();
  }

  @ApiOperation({ summary: 'Retrieve a subtask by ID' })
  @ApiResponse({ type: Subtask })
  @Get(':id')
  findOne(@Param('id') id: number): Promise<Subtask> {
    return this.subtaskService.findOne(id);
  }

  @ApiOperation({ summary: 'Update a subtask by ID' })
  @ApiResponse({ type: Subtask })
  @Put(':id')
  update(@Param('id') id: number, @Body() updateSubtaskDto: UpdateSubtaskDto): Promise<Subtask> {
    return this.subtaskService.update(id, updateSubtaskDto);
  }

  @ApiOperation({ summary: 'Delete a subtask by ID' })
  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.subtaskService.remove(id);
  }
}
