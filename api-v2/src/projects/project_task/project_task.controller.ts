/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Put, Post,Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProjectTaskService } from './project_task.service';
import { CreateProjectTaskDTO, UpdateProjectTaskDTO } from './project_task.dto';

@ApiTags('Project-task')
@Controller('api/project-task')
export class ProjectTaskController {
    constructor(
        private projectTaskService: ProjectTaskService
    ){}
    // ============>> Listing Controller
    @Get()
    async listing(): Promise<any>{
        return await this.projectTaskService.listing();
    }
    // ============>> Create Controller
    @Post('create')
    async create(@Body() body: CreateProjectTaskDTO): Promise<any>{
        return await this.projectTaskService.create(body);
    }
    // ============>> Update Controller
    @Put('update/:id')
    async update(@Param('id') id:number , @Body() body: UpdateProjectTaskDTO): Promise<any>{
        return  await   this.projectTaskService.update(id,body) ;
    }
    // ============>> Update Controller
    @Delete('delete/:id')
    async delete(@Param('id') id:number): Promise<any>{
        return await this.projectTaskService.delete(id);
    }

}
