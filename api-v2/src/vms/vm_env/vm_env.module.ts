import { Module } from '@nestjs/common';
import { VmEnvService } from './vm_env.service';
import { VmEnvController } from './vm_env.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VMsEnv } from 'src/entity/vm/vms_env.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VMsEnv])],
  providers: [VmEnvService],
  controllers: [VmEnvController]
})
export class VmEnvModule {}
