import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subtask } from './entities/subtask.entity';
import { SubtaskService } from './subtask.service';
import { SubtaskController } from './subtask.controller';
import { Task } from 'src/task/entities/task.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Subtask, Task])], 
  controllers: [SubtaskController],
  providers: [SubtaskService],
  exports: [TypeOrmModule], 
})
export class SubtaskModule {}
