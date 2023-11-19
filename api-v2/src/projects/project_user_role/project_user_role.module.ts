import { Module } from '@nestjs/common';
import { ProjectUserRoleService } from './project_user_role.service';
import { ProjectUserRoleController } from './project_user_role.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsUserRole } from 'src/entity/project/projects_user_role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectsUserRole])],
  providers: [ProjectUserRoleService],
  controllers: [ProjectUserRoleController]
})
export class ProjectUserRoleModule {}
