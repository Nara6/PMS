/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TechnologyLibraryService } from './technology_library.service';
import { techLirariesCreateDTO, techLirariesUdpateDTO } from './technology_library.dto';

@ApiTags('technology-library')
@Controller('api/tech-library')
export class TechnologyLibraryController {
    constructor(
        private techLibraryService: TechnologyLibraryService
    ){}
    // ============>> Listing Controller
    @Get()
    async listing(): Promise<any>{
        return await this.techLibraryService.listing();
    }

    // ============>> Create Controller
    @Post('create')
    async create(@Body() body: techLirariesCreateDTO): Promise<any>{
        return await this.techLibraryService.create(body);
    }
    // ============>> Update Controller
    @Put('update/:id')
    async update(@Param('id') id: number,@Body() body: techLirariesUdpateDTO): Promise<any>{
        return await this.techLibraryService.update(id,body);
    }

    // ============>> Delete Controller
    @Delete('delete/:id')
    async delete(@Param('id') id: number): Promise<any>{
        return await this.techLibraryService.delete(id);
    }

    // ============>> Data Setup Controller
    @Get('data-setup')
    async dataSetup(): Promise<any>{
        return await this.techLibraryService.dataSetup();
    }
}
