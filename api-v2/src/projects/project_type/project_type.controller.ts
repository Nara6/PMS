/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProjectTypeService } from './project_type.service';
import { CreateProjectTypeDTO, UpdateProjectTypeDTO } from './project_type.dto';

@ApiTags('project-type')
@Controller('api/projects-type')
export class ProjectTypeController {
    constructor(
        private projectTypeService: ProjectTypeService
    ){}
    // ============>> Listing Controller
    @Get()
    async listing(): Promise<any>{
        return await this.projectTypeService.listing();
    }
    // ============>> Create Controller
    @Post('create')
    async create(@Body() body: CreateProjectTypeDTO): Promise<any>{
        return await this.projectTypeService.create(body);
    }
    // ============>> Update Controller
    @Put('update/:id')
    async update(@Param('id') id:number, @Body() body: UpdateProjectTypeDTO): Promise<any>{
        return  await   this.projectTypeService.update(id,body) ;
    }
    // ============>> Update Controller
    @Delete('delete/:id')
    async delete(@Param('id') id:number): Promise<any>{
        return await this.projectTypeService.delete(id);
    }
}
