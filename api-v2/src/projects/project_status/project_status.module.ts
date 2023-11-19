import { Module } from '@nestjs/common';
import { ProjectStatusService } from './project_status.service';
import { ProjectStatusController } from './project_status.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsStatus } from 'src/entity/project/projects_status.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectsStatus])],
  providers: [ProjectStatusService],
  controllers: [ProjectStatusController]
})
export class ProjectStatusModule {}
