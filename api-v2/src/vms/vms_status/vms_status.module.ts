import { Module } from '@nestjs/common';
import { VmsStatusController } from './vms_status.controller';
import { VmsStatusService } from './vms_status.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VMsStatus } from 'src/entity/vm/vms_status.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VMsStatus])],
  controllers: [VmsStatusController],
  providers: [VmsStatusService]
})
export class VmsStatusModule {}
