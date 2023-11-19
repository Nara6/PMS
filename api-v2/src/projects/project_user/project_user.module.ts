import { Module } from '@nestjs/common';
import { ProjectUserService } from './project_user.service';
import { ProjectUserController } from './project_user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsUser } from 'src/entity/project/projects_user.entity';
import { ProjectsUserRole } from 'src/entity/project/projects_user_role.entity';
import { Users } from 'src/entity/user/users.entity';
import { Projects } from 'src/entity/project/projects.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectsUser, ProjectsUserRole, Users,Projects])],
  providers: [ProjectUserService],
  controllers: [ProjectUserController]
})
export class ProjectUserModule {}
