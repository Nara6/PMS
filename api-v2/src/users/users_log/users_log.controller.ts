/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersLog } from 'src/entity/user/users_log.entity';
import { Repository } from 'typeorm';
import { CreateUsersLogDTO, UpdateUsersLogDTO } from './users_log.dto';
import { UsersLogService } from './users_log.service';

@ApiTags('users-log')
@Controller('api/users-log')
export class UsersLogController {
    constructor(
        private readonly userLogService: UsersLogService
    ) {}

    // Listing
    @Get()
    async listing(): Promise<UsersLog[]>{
        return await this.userLogService.findallUsersLog();
    }

    // Create
    @Post('create')
    async create(@Body() createUsersLogDTO: CreateUsersLogDTO): Promise<any>{
        return await this.userLogService.createUsersLog(createUsersLogDTO);
    }
    // Create
    @Put('update/:id')
    async update(@Param('id') id: number,@Body() updateUsersLogDTO: UpdateUsersLogDTO): Promise<any>{
        return await this.userLogService.updateUserLog(id,updateUsersLogDTO);
    }
}
