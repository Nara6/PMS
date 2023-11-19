import { Module } from '@nestjs/common';
import { TechnologyService } from './technology.service';
import { TechnologyController } from './technology.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tech } from 'src/entity/technology/tech.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tech])],
  providers: [TechnologyService],
  controllers: [TechnologyController]
})
export class TechnologyModule {}
