/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProjectTimelineStatusService } from './project_timeline_status.service';
import { CreateProjectTimeLineStatusDTO, UpdateProjectTimeLineStatusDTO } from './project_timeline_status.dto';

@ApiTags('project-timeline-status')
@Controller('api/projects-timeline-status')
export class ProjectTimelineStatusController {
    constructor(
        private projectTimeStatusService: ProjectTimelineStatusService
    ){}
    // ============>> Listing Controller
    @Get()
    async listing(): Promise<any>{
        return await this.projectTimeStatusService.listing();
    }
    // ============>> Create Controller
    @Post('create')
    async create(@Body() body: CreateProjectTimeLineStatusDTO): Promise<any>{
        return await this.projectTimeStatusService.create(body);
    }
    // ============>> Update Controller
    @Put('update/:id')
    async update(@Param('id') id:number , @Body() body: UpdateProjectTimeLineStatusDTO): Promise<any>{
        return  await   this.projectTimeStatusService.update(id,body) ;
    }
    // ============>> Update Controller
    @Delete('delete/:id')
    async delete(@Param('id') id:number): Promise<any>{
        return await this.projectTimeStatusService.delete(id);
    }
    
}
