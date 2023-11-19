import { Module } from '@nestjs/common';
import { ProjectTypeService } from './project_type.service';
import { ProjectTypeController } from './project_type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsType } from 'src/entity/project/projects_type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectsType])],
  providers: [ProjectTypeService],
  controllers: [ProjectTypeController]
})
export class ProjectTypeModule {}
