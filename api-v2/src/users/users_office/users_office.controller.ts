/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersOffice } from 'src/entity/user/users_office.entity';
import { UsersOfficeService } from './users_office.service';
import { createUsersOfficeDTO, updateUsersOfficeDTO } from './users_office.dto';

@ApiTags('users-office')
@Controller('api/users-office')
export class UsersOfficeController {
    constructor(readonly usersOfficeService: UsersOfficeService){}

    // ============>> Listing Controller
    @Get()
    async listing(): Promise<UsersOffice[]>{
        return await this.usersOfficeService.findAllUsersOffice();
    }

    // ============>> Create Controller
    @Post('create')
    async create(@Body() body: createUsersOfficeDTO): Promise<any> {
        return await this.usersOfficeService.create(body);
    }
    // ============>> Update Controller
    @Put('update/:id')
    async update(@Param('id') id:number ,@Body() body: updateUsersOfficeDTO): Promise<any> {
        return await this.usersOfficeService.update(id,body);
    }
    // ============>> Delete Controller
    @Delete('delete/:id')
    async delete(@Param('id') id:number): Promise<any>{
        return await this.usersOfficeService.delete(id);
    }
}

