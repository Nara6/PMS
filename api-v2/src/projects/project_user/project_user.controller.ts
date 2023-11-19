/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post, Put, Query, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProjectUserService } from './project_user.service';
import { CreateProjectUserDTO, UpdateProjectUserDTO} from './project_user.dto';
import { ProjectsUser } from 'src/entity/project/projects_user.entity';
import { PageDto, PageOptionDTO } from 'src/utils/pagination/pagination.dto';

@ApiTags('Project-user')
@Controller('api/project-user')
export class ProjectUserController {
    constructor(
        private projectUser: ProjectUserService
    ){}
    // ============>> Listing Controller
    @Get()
    async listing(@Query() pageOptionDTO: PageOptionDTO): Promise<PageDto<ProjectsUser>>{
        return await this.projectUser.listing(pageOptionDTO);
    }
    // ============>> List by id Controller
    @Get(':id')
    async listById(@Param('id') id: number): Promise<any>{
        return await this.projectUser.listById(id);
    }
    // ============>> Create Controller
    @Post('create')
    async create(@Body() body: CreateProjectUserDTO): Promise<any>{
        return await this.projectUser.create(body);
    }
    // ============>> Update Controller
    @Put('update/:id')
    async update(@Param('id') id: number, @Body() body: UpdateProjectUserDTO): Promise<any>{
        return await this.projectUser.update(id, body);
    }
    // ============>> Delete Controller
    @Delete('delete/:id')
    async delete(@Param('id') id:number): Promise<any>{
        return await this.projectUser.delete(id);
    }
    // ============>> Data-setup Controller
    @Get('data-setup/listing')
    async dataSetup(): Promise<any>{
        return await this.projectUser.data_setup();
    }
}
