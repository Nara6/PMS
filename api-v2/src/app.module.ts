import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmConfigService } from './config/typeorm.config';
import { UsersRoleModule } from './users/users_role/users_role.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { UsersLogModule } from './users/users_log/users_log.module';
import { UsersDepartmentModule } from './users/users_department/users_department.module';
import { UsersOfficeModule } from './users/users_office/users_office.module';
import { UsersTitleModule } from './users/users_title/users_title.module';
import { UsersPositionModule } from './users/users_position/users_position.module';
import { VmsModule } from './vms/vms.module';
import { TechnologyModule } from './technology/technology.module';
import { TechnologyLibTypeModule } from './technology/technology_lib_type/technology_lib_type.module';
import { TechnologyLibraryModule } from './technology/technology_library/technology_library.module';
import { ProjectsModule } from './projects/projects.module';
import { ProjectTypeModule } from './projects/project_type/project_type.module';
import { ProjectStatusModule } from './projects/project_status/project_status.module';
import { ProjectAppTypeModule } from './projects/project_app_type/project_app_type.module';
import { ProjectUserRoleModule } from './projects/project_user_role/project_user_role.module';
import { ProjectTimelineStatusModule } from './projects/project_timeline_status/project_timeline_status.module';
import { ProjectAppModule } from './projects/project_app/project_app.module';
import { ProjectAppEnvModule } from './projects/project_app_env/project_app_env.module';
import { ProjectUserModule } from './projects/project_user/project_user.module';
import { ProjectTimelineModule } from './projects/project_timeline/project_timeline.module';
import { VmsAccessModule } from './vms/vms_access/vms_access.module';
import { VmsTagModule } from './vms/vms_tag/vms_tag.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { CustomForbiddenException } from './utils/exception/ForbiddenException';
import { RequestInfoInterceptor } from './utils/interceptor/RequestInfoInterceptor';
import { HealthModule } from './health/health.module';
import { ProjectTaskStatusModule } from './projects/project_task_status/project_task_status.module';
import { ProjectTaskModule } from './projects/project_task/project_task.module';
import { VmEnvModule } from './vms/vm_env/vm_env.module';
import { VmsOsModule } from './vms/vms_os/vms_os.module';
import { VmsStatusModule } from './vms/vms_status/vms_status.module';
import { DashboardModule } from './dashboard/dashboard.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    ConfigModule.forRoot(),
    AuthModule,
    DashboardModule,
    UsersModule,
    UsersRoleModule,
    UsersLogModule,
    UsersDepartmentModule,
    UsersOfficeModule,
    UsersTitleModule,
    UsersPositionModule,
    VmsModule,
    VmEnvModule,
    VmsStatusModule,
    VmsOsModule,
    VmsAccessModule,
    VmsTagModule,
    TechnologyModule,
    TechnologyLibTypeModule,
    TechnologyLibraryModule,
    ProjectsModule,
    ProjectTypeModule,
    ProjectStatusModule,
    ProjectAppTypeModule,
    ProjectUserRoleModule,
    ProjectTimelineStatusModule,
    ProjectAppModule,
    ProjectAppEnvModule,
    ProjectUserModule,
    ProjectTimelineModule,
    HealthModule,
    ProjectTaskStatusModule,
    ProjectTaskModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: RequestInfoInterceptor
    },
    {
      provide: APP_FILTER,
      useClass: CustomForbiddenException
    },
  
  ],
})
export class AppModule {}
