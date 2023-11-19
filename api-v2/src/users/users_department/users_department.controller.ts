/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersDepartment } from 'src/entity/user/users_department.entity';
import { UsersDepartmentService } from './users_department.service';
import { createUsersDepartmentDTO, updateUsersDepartmentDTO } from './users_department.dto';

@ApiTags('users-department')
@Controller('api/users-department')
export class UsersDepartmentController {
    constructor(readonly usersDepartmentService: UsersDepartmentService){}

    // ============>> Listing Controller
    @Get()
    async listing(): Promise<UsersDepartment[]>{
        return await this.usersDepartmentService.findAllUsersDepartment();
    }

    // ============>> Create Controller
    @Post('create')
    async create(@Body() body: createUsersDepartmentDTO): Promise<any> {
        return await this.usersDepartmentService.create(body);
    }
    // ============>> Update Controller
    @Put('update/:id')
    async update(@Param('id') id:number ,@Body() body: updateUsersDepartmentDTO): Promise<any> {
        return await this.usersDepartmentService.update(id,body);
    }
    // ============>> Delete Controller
    @Delete('delete/:id')
    async delete(@Param('id') id:number): Promise<any>{
        return await this.usersDepartmentService.delete(id);
    }
}
