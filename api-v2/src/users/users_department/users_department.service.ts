/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersDepartment } from 'src/entity/user/users_department.entity';
import { Repository } from 'typeorm';
import { createUsersDepartmentDTO, updateUsersDepartmentDTO } from './users_department.dto';

@Injectable()
export class UsersDepartmentService {
    constructor(
        @InjectRepository(UsersDepartment)
        private readonly usersDepartmentsRepo: Repository<UsersDepartment>
    ){}
    // ===========>> Listing Service
    async findAllUsersDepartment(): Promise<UsersDepartment[]>{
        return await this.usersDepartmentsRepo.find();
    }

    // ===========>> Create Service
    async create(body:createUsersDepartmentDTO ): Promise<any>{
        const userDepartment = await this.usersDepartmentsRepo.save(body);
        return {
            success: true,
            message:'User Department Created Successfully',
            data : userDepartment
        }
    }
    // ===========>> Update Service
    async update( id: number,body:updateUsersDepartmentDTO ): Promise<any>{
        const isIdExist = await this.usersDepartmentsRepo.findOneBy( { id: id } );
        if(!isIdExist){
            throw new NotFoundException(`User Department with id=${id} not found`);
        }
        await this.usersDepartmentsRepo.update(id,
            {
                kh_name: body.kh_name,
                en_name: body.en_name
            }
        );
        const usersDepartment = await this.usersDepartmentsRepo.findOneBy({ id:id });
        return {
            success: true,
            message:'User Department Updated Successfully',
            data : usersDepartment
        }
    }

    // ===========>> Delete Service

    async delete(id: number): Promise<any>{
        const isIdExist = await this.usersDepartmentsRepo.findOneBy( { id: id } );
        if(!isIdExist){
            throw new NotFoundException(`User Department with id=${id} not found`);
        }
        await this.usersDepartmentsRepo.delete(id);
        return {
            success: true,
            message:`User Department Deleted Successfully`

        };
    }
}

