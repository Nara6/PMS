/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ProjectAppEnvService } from './project_app_env.service';
import { ProjectAppEnvController } from './project_app_env.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsAppEnv } from 'src/entity/project/projects_app_env.entity';
import { ProjectsApp } from 'src/entity/project/projects_app.entity';
import { VMsEnv } from 'src/entity/vm/vms_env.entity';
import { VMs } from 'src/entity/vm/vms.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectsAppEnv, ProjectsApp, VMsEnv, VMs])],
  providers: [ProjectAppEnvService],
  controllers: [ProjectAppEnvController]
})
export class ProjectAppEnvModule {}
