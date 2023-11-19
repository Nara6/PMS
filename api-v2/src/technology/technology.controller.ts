/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TechnologyService } from './technology.service';
import { CreateTechDTO, updateTechDTO } from './technology.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('technology')
@Controller('api/technology')
export class TechnologyController {
    constructor(
        private technology: TechnologyService,
    ){}
    // ============>> Listing Controller
    @Get()
    async listing(): Promise<any>{
        return await this.technology.listing();
    }
    // ============>> Create Controller
    @UseInterceptors(FileInterceptor('file'))
    @Post('create')
    async create(
        @Body() body: CreateTechDTO,
        @UploadedFile() file:Express.Multer.File
    ): Promise<any>{
        return await this.technology.create(body,file);
    }
    // ============>> Update Controller
    @Put('update/:id')
    async update(@Param('id') id: number, @Body() body: updateTechDTO): Promise<any>{
        return await this.technology.update(id, body);
    }
    // ============>> Delete Controller
    @Delete('delete/:id')
    async delete(@Param('id') id: number): Promise<any>{
        return await this.technology.delete(id);
    }

}
