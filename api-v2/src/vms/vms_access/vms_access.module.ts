/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { VmsAccessService } from './vms_access.service';
import { VmsAccessController } from './vms_access.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VMsAccess } from 'src/entity/vm/vms_access.entity';
import { VMsAccessType } from 'src/entity/vm/vms_access_type.entity';
import { VMs } from 'src/entity/vm/vms.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VMsAccess,VMsAccessType,VMs])],
  providers: [VmsAccessService],
  controllers: [VmsAccessController]
})
export class VmsAccessModule {}
