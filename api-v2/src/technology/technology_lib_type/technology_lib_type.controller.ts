/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TechnologyLibTypeService } from './technology_lib_type.service';
import { TechLibTypeCreateDTO, TechLibTypeUpdateDTO } from './technology_lib_type.dto';

@ApiTags('technology-lib-type')
@Controller('api/tech-lib-type')
export class TechnologyLibTypeController {
    constructor(
        private technologyLibTypeService: TechnologyLibTypeService
    ) {}
    // ==========>> Listing Controller
    @Get()
    async listing(): Promise<any>{
        return await this.technologyLibTypeService.listing();
    }
    // ==========>> Create Controller
    @Post('create')
    async create(@Body() body: TechLibTypeCreateDTO): Promise<any>{
        return await this.technologyLibTypeService.create(body);
    }

    // ==========>> Update Controller
    @Put('update/:id')
    async update(@Param('id') id: number,@Body() body: TechLibTypeUpdateDTO): Promise<any>{
        return await this.technologyLibTypeService.update(id , body) ;
    }
    // ==========>> Delete Controller
    @Delete('delete/:id')
    async delete(@Param('id') id: number): Promise<any>{
        return await this.technologyLibTypeService.delete(id) ;
    }
    
}
