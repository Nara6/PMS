/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersOffice } from 'src/entity/user/users_office.entity';
import { Repository } from 'typeorm';
import { createUsersOfficeDTO, updateUsersOfficeDTO } from './users_office.dto';
import { UsersDepartment } from 'src/entity/user/users_department.entity';

@Injectable()
export class UsersOfficeService {
    constructor(
        @InjectRepository(UsersOffice) 
        private usersOfficeRepo: Repository<UsersOffice>,
        @InjectRepository(UsersDepartment)
        private usersDepartmentRepo: Repository<UsersDepartment>,
    ){}
    async findAllUsersOffice(): Promise<UsersOffice[]>{
        return this.usersOfficeRepo.find();
    }
     // ===========>> Create Service
     async create(body:createUsersOfficeDTO ): Promise<any>{
        // const isUserDepartmentExist = await this.usersDepartmentRepo.findOneBy({ id: body.department_id });
        // if(!isUserDepartmentExist){
        //     throw new NotFoundException('Invalid User Department!');
        // }
        const userOffice = await this.usersOfficeRepo.save(
            {
                kh_name: body.kh_name,
                en_name: body.en_name,
                // department_id : isUserDepartmentExist
            }
        );
        return {
            success: true,
            message:'User Office Created Successfully',
            data : userOffice
        }
    }
    // ===========>> Update Service
    async update( id: number,body:updateUsersOfficeDTO ): Promise<any>{
        const isIdExist = await this.usersOfficeRepo.findOneBy( { id: id } );
        if(!isIdExist){
            throw new NotFoundException(`User Office with id=${id} not found`);
        }
        // const isUserDepartmentExist = await this.usersDepartmentRepo.findOneBy({ id: body.department_id });
        // if(!isUserDepartmentExist){
        //     throw new NotFoundException('Invalid User Department!');
        // }
        await this.usersOfficeRepo.update(id,
            {
                kh_name: body.kh_name,
                en_name: body.en_name,
                // department_id: isUserDepartmentExist
            }
        );
        const usersOffice = await this.usersOfficeRepo.findOneBy({ id:id });
        return {
            success: true,
            message:'User Office Updated Successfully',
            data : usersOffice
        }
    }

    // ===========>> Delete Service

    async delete(id: number): Promise<any>{
        const isIdExist = await this.usersOfficeRepo.findOneBy( { id: id } );
        if(!isIdExist){
            throw new NotFoundException(`User Office with id=${id} not found`);
        }
        await this.usersOfficeRepo.delete(id);
        return {
            success: true,
            message:`User Office Deleted Successfully`

        };
    }
}
