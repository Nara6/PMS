/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProjectTimelineService } from './project_timeline.service';
import { CreateProjectTimeLineDTO, UpdateProjectTimeLineDTO } from './project_timeline.dto';

@ApiTags('Project-Timeline')
@Controller('api/project-timeline')
export class ProjectTimelineController {
    constructor(
        private projectTimelineService: ProjectTimelineService
    ){}
    // ============>> Listing Controller
    @Get()
    async listing(): Promise<any>{
        return await this.projectTimelineService.listing();
    }
    // ============>> List by id Controller
    @Get(':id')
    async listById(@Param('id') id: number): Promise<any>{
        return await this.projectTimelineService.listById(id);
    }
    // ============>> Create Controller
    @Post('create')
    async create(@Body() body: CreateProjectTimeLineDTO): Promise<any>{
        return await this.projectTimelineService.create(body);
    }
    // ============>> Update Controller
    @Put('update/:id')
    async update(@Param('id') id:number, @Body() body: UpdateProjectTimeLineDTO): Promise<any>{
        return await this.projectTimelineService.update(id,body);
    }
    // ============>> Delete Controller
    @Delete('delete/:id')
    async delete(@Param('id') id:number): Promise<any>{
        return await this.projectTimelineService.delete(id);
    }
    // ============>> Data-setup Controller
    @Get('data-setup/listing')
    async dataSetup(): Promise<any>{
        return await this.projectTimelineService.data_setup();
    }
}
