/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Param, Post, Put, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProjectAppTypeService } from './project_app_type.service';
import { CreateProjectAppTypeDTO, UpdateProjectAppTypeDTO } from './project_app_type.dto';

@ApiTags('project-app-type')
@Controller('api/projects-app-type')
export class ProjectAppTypeController {
    constructor(
        private readonly projectAppType: ProjectAppTypeService
    ) {}
    // ============>> Listing Controller
    @Get()
    async listing(): Promise<any>{
        return await this.projectAppType.listing();
    }
    // ============>> Create Controller
    @Post('create')
    async create(@Body() body: CreateProjectAppTypeDTO): Promise<any>{
        return await this.projectAppType.create(body);
    }
    // ============>> Update Controller
    @Put('update/:id')
    async update(@Param('id') id:number , @Body() body: UpdateProjectAppTypeDTO): Promise<any>{
        return  await   this.projectAppType.update(id,body) ;
    }
    // ============>> Update Controller
    @Delete('delete/:id')
    async delete(@Param('id') id:number): Promise<any>{
        return await this.projectAppType.delete(id);
    }
}
