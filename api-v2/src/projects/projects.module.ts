/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Projects } from 'src/entity/project/projects.entity';
import { ProjectsType } from 'src/entity/project/projects_type.entity';
import { ProjectsStatus } from 'src/entity/project/projects_status.entity';
import { Users } from 'src/entity/user/users.entity';
import { ProjectsUserRole } from 'src/entity/project/projects_user_role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Projects,ProjectsType,ProjectsStatus,Users,ProjectsUserRole])],
  providers: [ProjectsService],
  controllers: [ProjectsController]
})
export class ProjectsModule {}
