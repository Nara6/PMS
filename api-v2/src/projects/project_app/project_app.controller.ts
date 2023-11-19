/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post, Put, Delete} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProjectAppService } from './project_app.service';
import { CreateProjectAppDTO, UpdateProjectAppDTO } from './project_app.dto';

@ApiTags('Project-app')
@Controller('api/projects-app')
export class ProjectAppController {
    constructor(
        private readonly projectAppService: ProjectAppService
    ) {}
    // ============>> Listing Controller
    @Get()
    async listing(): Promise<any>{
        return await this.projectAppService.listing();
    }
    // ============>> List by id Controller
    @Get(':id')
    async listById(@Param('id') id: number): Promise<any>{
        return await this.projectAppService.listById(id);
    }
    // ============>> Create Controller
    @Post('create')
    async create(@Body() body: CreateProjectAppDTO): Promise<any>{
        return await this.projectAppService.create(body);
    }
    // ============>> Update Controller
    @Put('update/:id')
    async update(@Param('id') id:number , @Body() body: UpdateProjectAppDTO): Promise<any>{
        return  await   this.projectAppService.update(id,body) ;
    }
    // ============>> Delete Controller
    @Delete('delete/:id')
    async delete(@Param('id') id:number): Promise<any>{
        return await this.projectAppService.delete(id);
    }
    // ============>> Data-setup Controller
    @Get('data-setup/listing')
    async dataSetup(): Promise<any>{
        return await this.projectAppService.data_setup();
    }
}
