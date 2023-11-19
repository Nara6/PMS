/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersPosition } from 'src/entity/user/users_position.entity';
import { UsersPositionService } from './users_position.service';
import { createUsersPositionDTO, updateUsersPositionDTO } from './users_position.dto';

@ApiTags('users-position')
@Controller('api/users-position')
export class UsersPositionController {
    constructor(readonly usersPositionService: UsersPositionService){}
    @Get()
    async listing(): Promise<UsersPosition[]>{
        return await this.usersPositionService.findAllUsersPosition();
    }
    // ============>> Create Controller
    @Post('create')
    async create(@Body() body: createUsersPositionDTO): Promise<any> {
        return await this.usersPositionService.create(body);
    }
    // ============>> Update Controller
    @Put('update/:id')
    async update(@Param('id') id:number ,@Body() body: updateUsersPositionDTO): Promise<any> {
        return await this.usersPositionService.update(id,body);
    }
    // ============>> Delete Controller
    @Delete('delete/:id')
    async delete(@Param('id') id:number): Promise<any>{
        return await this.usersPositionService.delete(id);
    }
}
