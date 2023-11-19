/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { UsersRoleService } from './users_role.service';
import { ApiTags } from '@nestjs/swagger';
import { UsersRole } from 'src/entity/user/users_role.entity';
import { createUsersRoleDTO, updateUsersRoleDTO } from './users_role.dto';

@ApiTags('users-role')
@Controller('api/users-role')
export class UsersRoleController {
  constructor(private readonly usersRoleService: UsersRoleService) { }

  @Get()
  async findAll(): Promise<UsersRole[]> {
    return this.usersRoleService.findAll();
  }
  // ============>> Create Controller
  @Post('create')
  async create(@Body() body: createUsersRoleDTO): Promise<any> {
    return await this.usersRoleService.create(body);
  }
  // ============>> Update Controller
  @Put('update/:id')
  async update(@Param('id') id: number, @Body() body: updateUsersRoleDTO): Promise<any> {
    return await this.usersRoleService.update(id, body);
  }
  // ============>> Delete Controller
  @Delete('delete/:id')
  async delete(@Param('id') id: number): Promise<any> {
    return await this.usersRoleService.delete(id);
  }
}
