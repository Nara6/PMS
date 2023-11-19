/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProjectStatusService } from './project_status.service';
import { CreateProjectStatusDTO, UpdateProjectStatusDTO } from './project_status.dto';

@ApiTags('project-status')
@Controller('api/projects-status')
export class ProjectStatusController {
    constructor(
        private readonly projectStatusService: ProjectStatusService
    ) {}
    // ============>> Listing Controller
    @Get()
    async listing(): Promise<any>{
        return await this.projectStatusService.listing();
    }
    // ============>> Create Controller
    @Post('create')
    async create(@Body() body: CreateProjectStatusDTO): Promise<any>{
        return await this.projectStatusService.create(body);
    }
    // ============>> Update Controller
    @Put('update/:id')
    async update(@Param('id') id:number , @Body() body: UpdateProjectStatusDTO): Promise<any>{
        return  await   this.projectStatusService.update(id,body) ;
    }
    // ============>> Update Controller
    @Delete('delete/:id')
    async delete(@Param('id') id:number): Promise<any>{
        return await this.projectStatusService.delete(id);
    }
    
}
