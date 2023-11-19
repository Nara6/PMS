/* eslint-disable prettier/prettier */
import { Body, Controller, Param, Get, Post,Put, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProjectsService } from './projects.service';
import { CreateProjectDTO, UpdateProjectDTO } from './projects.dto';

@ApiTags('project')
@Controller('api/projects')
export class ProjectsController {
    constructor(
        private readonly projectService: ProjectsService
    ) {}
    // ============>> Listing Controller
    @Get()
    async listing(): Promise<any>{
        return await this.projectService.listing();
    }
    // ============>> List by id Controller
    @Get(':id')
    async listById(@Param('id') id: number): Promise<any>{
        return await this.projectService.listById(id);
    }
    // ============>> Create Controller
    @Post('create')
    async create(@Body() body: CreateProjectDTO): Promise<any>{
        return await this.projectService.create(body);
    }
    // ============>> Update Controller
    @Put('update/:id')
    async update(@Param('id') id:number , @Body() body: UpdateProjectDTO): Promise<any>{
        return  await   this.projectService.update(id,body) ;
    }
    // ============>> Update Controller
    @Delete('delete/:id')
    async delete(@Param('id') id:number): Promise<any>{
        return await this.projectService.delete(id);
    }
    // ============>> Data-setup Controller
    @Get('data-setup/listing')
    async dataSetup(): Promise<any>{
        return await this.projectService.data_setup();
    }
    
}
