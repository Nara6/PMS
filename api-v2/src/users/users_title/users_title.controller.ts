/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Put, Post, Delete, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersTitle } from 'src/entity/user/users_title.entity';
import { UsersTitleService } from './users_title.service';
import { createUsersTitleDTO, updateUsersTitleDTO } from './users_title.dto';

@ApiTags('users-title')
@Controller('api/users-title')
export class UsersTitleController {
    constructor(readonly usersTitleService: UsersTitleService){}
    @Get()
    async listing(): Promise<UsersTitle[]>{
        return await this.usersTitleService.findAllUsersTitle();
    }
    // ============>> Create Controller
    @Post('create')
    async create(@Body() body: createUsersTitleDTO): Promise<any> {
        return await this.usersTitleService.create(body);
    }
    // ============>> Update Controller
    @Put('update/:id')
    async update(@Param('id') id:number ,@Body() body: updateUsersTitleDTO): Promise<any> {
        return await this.usersTitleService.update(id,body);
    }
    // ============>> Delete Controller
    @Delete('delete/:id')
    async delete(@Param('id') id:number): Promise<any>{
        return await this.usersTitleService.delete(id);
    }
}
