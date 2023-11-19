/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put, Query, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Users } from 'src/entity/user/users.entity';
import { CreateUserDTO, UpdatePasswordByAdminDTO, UpdatePasswordByOwnDTO, UpdateUserDTO } from './users.dto';
import { UsersService } from './users.service';
import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { PageDto, PageOptionDTO } from 'src/utils/pagination/pagination.dto';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { Roles } from 'src/auth/decorator/roles.enum';
import { Role } from 'src/auth/decorator/roles';

@ApiTags('user')
@Role(Roles.Admin)
@UseGuards(AuthGuard)
@ApiBearerAuth('access-token')
@Controller('api/users')
export class UsersController {
    constructor(readonly usersService: UsersService){}

    // ============>> Listing Controller
    @Get()
    async listing(@Query() pageOptionDTO: PageOptionDTO): Promise<PageDto<Users>>{
        return await this.usersService.findAllUsers(pageOptionDTO);
    }
    // ============>> List by id Controller
    @Role(Roles.Developer,Roles.Admin,Roles.Manager,Roles.Project_Admin,Roles.Project_Lead,Roles.DevOps_Head)
    @Get(':id')
    async listById(@Param('id') id:number): Promise<any>{
        return await this.usersService.listById(id);
    }
    // ============>> Create Controller
    @Post('create')
    // @ApiConsumes('multipart/form-data') // Specify that the endpoint consumes multipart form data
    @UseInterceptors(FileInterceptor('file'))
    async create(
        @Body() createUserDTO: CreateUserDTO,
        @UploadedFile() file:Express.Multer.File
    ): Promise<any>{
        
        return await this.usersService.createUser(createUserDTO,file);
    }

    // ============>> Update Controller
    @Role(Roles.Developer,Roles.Manager,Roles.Project_Admin,Roles.Project_Lead,Roles.DevOps_Head, Roles.Admin)
    @UseInterceptors(FileInterceptor('file'))
    @Put('update/:id')
    async update(
        @Param('id') id:number,
        @Body() updateUserDTO: UpdateUserDTO,
        @UploadedFile() file:Express.Multer.File
    ): Promise<any>{
        return await this.usersService.updateUser(id,updateUserDTO,file);
    }
    // ============>> Update password by admin
    @Put('update-password/:id')
    async updatePwdByAdmin(@Param('id') id:number,@Body() body: UpdatePasswordByAdminDTO): Promise<any>{
        return await this.usersService.updatePasswordByAdmin(id,body);
    }
    // ============>> Update password by admin
    @Role(Roles.Developer,Roles.Manager,Roles.Project_Admin,Roles.Project_Lead,Roles.DevOps_Head, Roles.Admin)
    @Put('my-profile/update-password/:id')
    async updatePwdByUser(@Param('id') id:number,@Body() body: UpdatePasswordByOwnDTO): Promise<any>{
        return await this.usersService.updatePasswordByOwn(id,body);
    }
    // ============>> Delete Controller
    @Delete('delete/:id')
    async delete(@Param('id') id:number): Promise<any>{
        return await this.usersService.deleteUserById(id);
    }

    // ============>> create user data set up
    @Get('data-setup/listing')
    async listDataSetup(): Promise<any>{
        return await this.usersService.listDataSetup();
    }

    // ============>> toggle active
    @Put('toggle-active/:id')
    async toggleActive(@Param('id') id:number): Promise<any>{
        return await this.usersService.toggleActive(id);
    }
    // ============>> user-project
    @Get('user-project/listing')
    async getUserProject(): Promise<any>{
        return await this.usersService.getUserProject();
    }
    // ============>> user-project by user_id
    @Get('user-project/listing/:id')
    async getUserProjectById(@Param('id') id: number): Promise<any>{
        return await this.usersService.getUserProjectById(id);
    }
}
