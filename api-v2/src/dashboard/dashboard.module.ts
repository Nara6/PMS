import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/entity/user/users.entity';
import { Projects } from 'src/entity/project/projects.entity';
import { VMs } from 'src/entity/vm/vms.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Users, Projects, VMs])],
  providers: [DashboardService],
  controllers: [DashboardController]
})
export class DashboardModule {}
