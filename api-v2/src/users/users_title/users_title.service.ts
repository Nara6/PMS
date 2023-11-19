/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersTitle } from 'src/entity/user/users_title.entity';
import { Repository } from 'typeorm';
import { createUsersTitleDTO, updateUsersTitleDTO } from './users_title.dto';

@Injectable()
export class UsersTitleService {
    constructor(
        @InjectRepository(UsersTitle)
        private readonly usersTitlesRepo: Repository<UsersTitle>,
    ){}

    async findAllUsersTitle(): Promise<UsersTitle[]>{
        return await this.usersTitlesRepo.find();
    }
     // ===========>> Create Service
     async create(body:createUsersTitleDTO ): Promise<any>{
        const userTitle = await this.usersTitlesRepo.save(body);
        return {
            success: true,
            message:'User Title Created Successfully',
            data : userTitle
        }
    }
    // ===========>> Update Service
    async update( id: number,body:updateUsersTitleDTO ): Promise<any>{
        const isIdExist = await this.usersTitlesRepo.findOneBy( { id: id } );
        if(!isIdExist){
            throw new NotFoundException(`User Title with id=${id} not found`);
        }
        await this.usersTitlesRepo.update(id,
            {
                kh_name: body.kh_name,
                en_name: body.en_name
            }
        );
        const usersTitle = await this.usersTitlesRepo.findOneBy({ id:id });
        return {
            success: true,
            message:'User Title Updated Successfully',
            data : usersTitle
        }
    }

    // ===========>> Delete Service

    async delete(id: number): Promise<any>{
        const isIdExist = await this.usersTitlesRepo.findOneBy( { id: id } );
        if(!isIdExist){
            throw new NotFoundException(`User Title with id=${id} not found`);
        }
        await this.usersTitlesRepo.delete(id);
        return {
            success: true,
            message:`User Title Deleted Successfully`

        };
    }
}
