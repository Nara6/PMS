/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersRole } from 'src/entity/user/users_role.entity';
import { createUsersRoleDTO, updateUsersRoleDTO } from './users_role.dto';

@Injectable()
export class UsersRoleService {
  constructor(
    @InjectRepository(UsersRole)
    private readonly UsersRoleRepository: Repository<UsersRole>,
  ) {}

  async findAll(): Promise<UsersRole[]> {
    return this.UsersRoleRepository.find();
  }
   // ===========>> Create Service
   async create(body:createUsersRoleDTO ): Promise<any>{
    const userRole = await this.UsersRoleRepository.save(body);
    return {
        success: true,
        message:'User Role Created Successfully',
        data : userRole
    }
}
// ===========>> Update Service
async update( id: number,body:updateUsersRoleDTO ): Promise<any>{
    const isIdExist = await this.UsersRoleRepository.findOneBy( { id: id } );
    if(!isIdExist){
        throw new NotFoundException(`User Role with id=${id} not found`);
    }
    await this.UsersRoleRepository.update(id,
        {
            kh_name: body.kh_name,
            en_name: body.en_name
        }
    );
    const usersRole = await this.UsersRoleRepository.findOneBy({ id:id });
    return {
        success: true,
        message:'User Role Updated Successfully',
        data : usersRole
    }
}

// ===========>> Delete Service

async delete(id: number): Promise<any>{
    const isIdExist = await this.UsersRoleRepository.findOneBy( { id: id } );
    if(!isIdExist){
        throw new NotFoundException(`User Role with id=${id} not found`);
    }
    await this.UsersRoleRepository.delete(id);
    return {
        success: true,
        message:`User Role Deleted Successfully`

    };
}

}
