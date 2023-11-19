/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ProjectTaskService } from './project_task.service';
import { ProjectTaskController } from './project_task.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsTask } from 'src/entity/project/projects_task.entity';
import { ProjectsTaskStatus } from 'src/entity/project/projects_task_status.entity';
import { Projects } from 'src/entity/project/projects.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectsTask,ProjectsTaskStatus,Projects])],
  providers: [ProjectTaskService],
  controllers: [ProjectTaskController]
})
export class ProjectTaskModule {}
