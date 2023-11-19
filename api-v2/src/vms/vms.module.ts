/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { VmsService } from './vms.service';
import { VmsController } from './vms.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VMs } from 'src/entity/vm/vms.entity';
import { VMsEnv } from 'src/entity/vm/vms_env.entity';
import { VMsOS } from 'src/entity/vm/vms_os.entity';
import { VMsStatus } from 'src/entity/vm/vms_status.entity';
import { VMsTag } from 'src/entity/vm/vms_tag.entity';

@Module({
  imports: [TypeOrmModule.forFeature(
    [
      VMs,
      VMsEnv,
      VMsOS,
      VMsStatus,
      VMsTag
    ]
  )
  ],
  providers: [VmsService],
  controllers: [VmsController]
})
export class VmsModule { }
