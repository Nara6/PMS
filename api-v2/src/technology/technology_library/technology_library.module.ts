import { Module } from '@nestjs/common';
import { TechnologyLibraryService } from './technology_library.service';
import { TechnologyLibraryController } from './technology_library.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TechLibraries } from 'src/entity/technology/tech_libraries.entity';
import { Tech } from 'src/entity/technology/tech.entity';
import { TechLibsType } from 'src/entity/technology/tech_libs_type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TechLibraries, Tech, TechLibsType])],
  providers: [TechnologyLibraryService],
  controllers: [TechnologyLibraryController]
})
export class TechnologyLibraryModule {}
