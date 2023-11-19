/* eslint-disable prettier/prettier */
import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entity/user/users.entity';
import { UsersLog } from 'src/entity/user/users_log.entity';
import { Repository } from 'typeorm';
import { CreateUsersLogDTO, UpdateUsersLogDTO } from './users_log.dto';

@Injectable()
export class UsersLogService {
        
    constructor(
        @InjectRepository(UsersLog)
        private readonly usersLogRepository: Repository<UsersLog>,
        @InjectRepository(Users)
        private readonly userRepository: Repository<Users>
    ){}
    // For listing Controller
    async findallUsersLog(): Promise<UsersLog[]> {
        return await this.usersLogRepository.find({
            relations:{
                user: true
            },
            select: {
                user:{
                    username: true,
                    en_name: true
                }
            }
            
        });
    }

    // For create Controller
    async createUsersLog(createUsersLogDTO: CreateUsersLogDTO): Promise<any>{
        const user = await this.userRepository.findOneBy({id: createUsersLogDTO.user_id});
        if(!user){
            throw new HttpException('Invalid User_id!', 400);
        }
        const usersLog = await this.usersLogRepository.save({
            user: user,
            ip: createUsersLogDTO.ip,
            os: createUsersLogDTO.os,
            agent: createUsersLogDTO.agent
        });
        return {
            success: true,
            message:'User Log Created Successfully',
            data: usersLog
        }
        
    }
    // For update Controller
    async updateUserLog(id: number,updateUsersDTO: UpdateUsersLogDTO): Promise<any>{
        const isUserLogExist = await this.usersLogRepository.findOneBy({id: id});
        if(!isUserLogExist){
            throw new NotFoundException("Invalid User Log");
        }
    }
}
