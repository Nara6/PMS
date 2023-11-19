import { Module } from '@nestjs/common';
import { VmsTagService } from './vms_tag.service';
import { VmsTagController } from './vms_tag.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VMsTag } from 'src/entity/vm/vms_tag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VMsTag])],
  providers: [VmsTagService],
  controllers: [VmsTagController]
})
export class VmsTagModule {}
