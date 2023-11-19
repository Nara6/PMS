import { Module } from '@nestjs/common';
import { ProjectAppService } from './project_app.service';
import { ProjectAppController } from './project_app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsAppType } from 'src/entity/project/projects_app_type.entity';
import { ProjectsApp } from 'src/entity/project/projects_app.entity';
import { Projects } from 'src/entity/project/projects.entity';
import { Tech } from 'src/entity/technology/tech.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectsAppType, ProjectsApp, Projects, Tech])],
  providers: [ProjectAppService],
  controllers: [ProjectAppController]
})
export class ProjectAppModule {}
