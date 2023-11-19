/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VMsStatus } from 'src/entity/vm/vms_status.entity';
import { Repository } from 'typeorm';
import { CreateVMStatusDTO, UpdateVMStatusDTO } from './vms_status.dto';

@Injectable()
export class VmsStatusService {
    constructor(
        @InjectRepository(VMsStatus)
        private readonly vmsStatusRepo: Repository<VMsStatus>,
    ){}
    // Listing all existing vmStatus data
    async listing(): Promise<any>{
        const entities = await this.vmsStatusRepo.find();
    if (!entities) {
            throw new NotFoundException('Data Not Found!');
        }
        return entities;
    }
    // Create new vm Status
    async create(body: CreateVMStatusDTO): Promise<any>{
        try{
            const data = await this.vmsStatusRepo.save(body);
            return {
                success: true,
                message: 'Data have been created successfully!',
                data: data
            }
        }catch(err){
            throw new BadRequestException(err);
        }
    }
    // Update vm Status by id
    async update(id: number, body: UpdateVMStatusDTO): Promise<any>{
        const isExist = await this.vmsStatusRepo.findOneBy({id: id});
        if(!isExist){
            throw new NotFoundException('Invalid VM Status!');
        }
        try{
            await this.vmsStatusRepo.update(
                {
                    id: id
                },
                {
                    name: body.name,
                    color: body.color,
                }
            );
            const data = await this.vmsStatusRepo.findOneBy({id: id});
            return {
                success: true,
                message: 'Data have been updated successfully!',
                data: data
            }
        }catch(err){
            throw new BadRequestException(err);
        }
    }
    // Delete vm Status by id
    async delete(id: number): Promise<any>{
        const isExist = await this.vmsStatusRepo.findOneBy({id: id});
        if (!isExist) {
            throw new NotFoundException('Invalid VM Status!');
        }
        try{
            await this.vmsStatusRepo.delete(id);
            return{
                success: true,
                message: 'Data have been deleted successfully!'
            }
        }catch(err){
            throw new BadRequestException(err);
        }
    }
}
