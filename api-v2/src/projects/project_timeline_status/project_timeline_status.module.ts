import { Module } from '@nestjs/common';
import { ProjectTimelineStatusService } from './project_timeline_status.service';
import { ProjectTimelineStatusController } from './project_timeline_status.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsTimeLineStat } from 'src/entity/project/projects_timeline_status.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectsTimeLineStat])],
  providers: [ProjectTimelineStatusService],
  controllers: [ProjectTimelineStatusController]
})
export class ProjectTimelineStatusModule {}
