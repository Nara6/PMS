/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersPosition } from 'src/entity/user/users_position.entity';
import { Repository } from 'typeorm';
import { createUsersPositionDTO, updateUsersPositionDTO } from './users_position.dto';

@Injectable()
export class UsersPositionService {
    constructor(
        @InjectRepository(UsersPosition)
        private readonly usersPositionRepo: Repository<UsersPosition>
    ){}
    async findAllUsersPosition(): Promise<UsersPosition[]> {
        return this.usersPositionRepo.find();
    }
     // ===========>> Create Service
     async create(body:createUsersPositionDTO ): Promise<any>{
        const userPosition = await this.usersPositionRepo.save(body);
        return {
            success: true,
            message:'User Position Created Successfully',
            data : userPosition
        }
    }
    // ===========>> Update Service
    async update( id: number,body:updateUsersPositionDTO ): Promise<any>{
        const isIdExist = await this.usersPositionRepo.findOneBy( { id: id } );
        if(!isIdExist){
            throw new NotFoundException(`User Position with id=${id} not found`);
        }
        await this.usersPositionRepo.update(id,
            {
                kh_name: body.kh_name,
                en_name: body.en_name
            }
        );
        const usersPosition = await this.usersPositionRepo.findOneBy({ id:id });
        return {
            success: true,
            message:'User Position Updated Successfully',
            data : usersPosition
        }
    }

    // ===========>> Delete Service

    async delete(id: number): Promise<any>{
        const isIdExist = await this.usersPositionRepo.findOneBy( { id: id } );
        if(!isIdExist){
            throw new NotFoundException(`User Position with id=${id} not found`);
        }
        await this.usersPositionRepo.delete(id);
        return {
            success: true,
            message:`User Position Deleted Successfully`

        };
    }
}
