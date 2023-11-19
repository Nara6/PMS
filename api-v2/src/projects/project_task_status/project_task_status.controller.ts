/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProjectTaskStatusService } from './project_task_status.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateProjectTaskStatusDTO, UpdateProjectTaskStatusDTO } from './project_task_status.dto';

@ApiTags('Project-Task-Status')
@Controller('api/project-task-status')
export class ProjectTaskStatusController {
    constructor(
        private projectTaskStatusService: ProjectTaskStatusService
    ){}
    // ============>> Listing Controller
    @Get()
    async listing(): Promise<any>{
        return await this.projectTaskStatusService.listing();
    }
    // ============>> Create Controller
    @Post('create')
    async create(@Body() body: CreateProjectTaskStatusDTO): Promise<any>{
        return await this.projectTaskStatusService.create(body);
    }
    // ============>> Update Controller
    @Put('update/:id')
    async update(@Param('id') id:number , @Body() body: UpdateProjectTaskStatusDTO): Promise<any>{
        return  await   this.projectTaskStatusService.update(id,body) ;
    }
    // ============>> Update Controller
    @Delete('delete/:id')
    async delete(@Param('id') id:number): Promise<any>{
        return await this.projectTaskStatusService.delete(id);
    }
}
