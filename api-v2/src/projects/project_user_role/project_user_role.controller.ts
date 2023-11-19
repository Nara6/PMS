/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProjectUserRoleService } from './project_user_role.service';
import { CreateProjectUserRoleDTO, UpdateProjectUserRoleDTO } from './project_user_role.dto';

@ApiTags('project-user-role')
@Controller('api/projects-user-role')
export class ProjectUserRoleController {
    constructor(
        private projectUserRoleService: ProjectUserRoleService
    ){}
    // ============>> Listing Controller
    @Get()
    async listing(): Promise<any>{
        return await this.projectUserRoleService.listing();
    }
    // ============>> Create Controller
    @Post('create')
    async create(@Body() body: CreateProjectUserRoleDTO): Promise<any>{
        return await this.projectUserRoleService.create(body);
    }
    // ============>> Update Controller
    @Put('update/:id')
    async update(@Param('id') id:number , @Body() body: UpdateProjectUserRoleDTO): Promise<any>{
        return  await   this.projectUserRoleService.update(id,body) ;
    }
    // ============>> Update Controller
    @Delete('delete/:id')
    async delete(@Param('id') id:number): Promise<any>{
        return await this.projectUserRoleService.delete(id);
    }
}
