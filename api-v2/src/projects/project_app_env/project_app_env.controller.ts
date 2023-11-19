/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProjectAppEnvService } from './project_app_env.service';
import { createProjectAppEnvDTO, updateProjectAppEnvDTO } from './project_app_env.dto';

@ApiTags('Project-app-env')
@Controller('api/project-app-env')
export class ProjectAppEnvController {
    constructor(
        private projectAppEnvService: ProjectAppEnvService
    ){}
    // ============>> Listing Controller
    @Get()
    async listing(): Promise<any>{
        return await this.projectAppEnvService.listing();
    }
    // ============>> List by id Controller
    @Get(':id')
    async listById(@Param('id') id: number): Promise<any>{
        return await this.projectAppEnvService.listById(id);
    }
    // ============>> Create Controller
    @Post('create')
    async create(@Body() body: createProjectAppEnvDTO): Promise<any>{
        return await this.projectAppEnvService.create(body);
    }
    // ============>> Update Controller
    @Put('update/:id')
    async update(@Param('id') id:number , @Body() body: updateProjectAppEnvDTO): Promise<any>{
        return await this.projectAppEnvService.update(id,body) ;
    }
    // ============>> Delete Controller
    @Delete('delete/:id')
    async delete(@Param('id') id:number): Promise<any>{
        return await this.projectAppEnvService.delete(id);
    }
    // ============>> Data-setup Controller
    @Get('data-setup/listing')
    async dataSetup(): Promise<any>{
        return await this.projectAppEnvService.data_setup();
    }
}
