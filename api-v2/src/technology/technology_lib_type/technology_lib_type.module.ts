import { Module } from '@nestjs/common';
import { TechnologyLibTypeService } from './technology_lib_type.service';
import { TechnologyLibTypeController } from './technology_lib_type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TechLibsType } from 'src/entity/technology/tech_libs_type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TechLibsType])],
  providers: [TechnologyLibTypeService],
  controllers: [TechnologyLibTypeController]
})
export class TechnologyLibTypeModule {}
