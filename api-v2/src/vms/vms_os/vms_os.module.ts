import { Module } from '@nestjs/common';
import { VmsOsService } from './vms_os.service';
import { VmsOsController } from './vms_os.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VMsOS } from 'src/entity/vm/vms_os.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VMsOS])],
  providers: [VmsOsService],
  controllers: [VmsOsController]
})
export class VmsOsModule {}
