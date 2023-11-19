/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VMsEnv } from 'src/entity/vm/vms_env.entity';
import { Repository } from 'typeorm';
import { CreateVMEnvDTO, UpdateVMEnvDTO } from './vms_env.dto';

@Injectable()
export class VmEnvService {
    constructor(
        @InjectRepository(VMsEnv)
        private readonly vmsEnvRepo: Repository<VMsEnv>,
    ){}
    // Listing all existing vmEnv data
    async listing(): Promise<any>{
        const entities = await this.vmsEnvRepo.find();
    if (!entities) {
            throw new NotFoundException('Data Not Found!');
        }
        return entities;
    }
    // Create new vm Env
    async create(body: CreateVMEnvDTO): Promise<any>{
        try{
            const data = await this.vmsEnvRepo.save(body);
            return {
                success: true,
                message: 'Data have been created successfully!',
                data: data
            }
        }catch(err){
            throw new BadRequestException(err);
        }
    }
    // Update vm Env by id
    async update(id: number, body: UpdateVMEnvDTO): Promise<any>{
        const isExist = await this.vmsEnvRepo.findOneBy({id: id});
        if(!isExist){
            throw new NotFoundException('Invalid VM Env!');
        }
        try{
            await this.vmsEnvRepo.update(
                {
                    id: id
                },
                {
                    name: body.name,
                }
            );
            const data = await this.vmsEnvRepo.findOneBy({id: id});
            return {
                success: true,
                message: 'Data have been updated successfully!',
                data: data
            }
        }catch(err){
            throw new BadRequestException(err);
        }
    }
    // Delete vm Env by id
    async delete(id: number): Promise<any>{
        const isExist = await this.vmsEnvRepo.findOneBy({id: id});
        if (!isExist) {
            throw new NotFoundException('Invalid VM Env!');
        }
        try{
            await this.vmsEnvRepo.delete(id);
            return{
                success: true,
                message: 'Data have been deleted successfully!'
            }
        }catch(err){
            throw new BadRequestException(err);
        }
    }
}
