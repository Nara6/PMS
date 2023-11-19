/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ProjectTimelineService } from './project_timeline.service';
import { ProjectTimelineController } from './project_timeline.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsTimeLine } from 'src/entity/project/projects_timeline.entity';
import { Projects } from 'src/entity/project/projects.entity';
import { ProjectsTimeLineStat } from 'src/entity/project/projects_timeline_status.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectsTimeLine, Projects,ProjectsTimeLineStat])],
  providers: [ProjectTimelineService],
  controllers: [ProjectTimelineController]
})
export class ProjectTimelineModule {}
