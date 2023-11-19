import { Module } from '@nestjs/common';
import { ProjectTaskStatusService } from './project_task_status.service';
import { ProjectTaskStatusController } from './project_task_status.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsTaskStatus } from 'src/entity/project/projects_task_status.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectsTaskStatus])],
  providers: [ProjectTaskStatusService],
  controllers: [ProjectTaskStatusController]
})
export class ProjectTaskStatusModule {}
