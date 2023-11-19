import { Module } from '@nestjs/common';
import { ProjectAppTypeService } from './project_app_type.service';
import { ProjectAppTypeController } from './project_app_type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsAppType } from 'src/entity/project/projects_app_type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectsAppType])],
  providers: [ProjectAppTypeService],
  controllers: [ProjectAppTypeController]
})
export class ProjectAppTypeModule {}
