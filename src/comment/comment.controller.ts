import { Controller, Post, Get, Patch, Delete, Body, Param, NotFoundException } from '@nestjs/common';
import { CommentService } from './comment.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { User } from 'src/auth/entities/user.entity';
import { Task } from 'src/task/entities/task.entity';
import { Comment } from './entities/comment.entity';

@ApiTags('comments')
@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new comment' })
  @ApiResponse({type: Comment })
  async createComment(@Body() createCommentDto: CreateCommentDto) {
    const { text, authorId, taskId } = createCommentDto;
    return this.commentService.createComment(text, { id: authorId } as User, { id: taskId } as Task);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a comment by ID' })
  @ApiResponse({type: Comment })
  async getCommentById(@Param('id') id: number) {
    const comment = await this.commentService.getCommentById(id);
    if (!comment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }
    return comment;
  }

  @Get('task/:taskId')
  @ApiOperation({ summary: 'Get comments by task ID' })
  @ApiResponse({type: [Comment] })
  async getCommentsByTask(@Param('taskId') taskId: number) {
    return this.commentService.getCommentsByTask(taskId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a comment' })
  @ApiResponse({type: Comment })
  async updateComment(@Param('id') id: number, @Body() updateCommentDto: UpdateCommentDto) {
    const updatedComment = await this.commentService.updateComment(id, updateCommentDto.text);
    if (!updatedComment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }
    return updatedComment;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a comment' })
  async deleteComment(@Param('id') id: number) {
    const deleted = await this.commentService.deleteComment(id);
  }
}
