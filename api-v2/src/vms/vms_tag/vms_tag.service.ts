/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VMsTag } from 'src/entity/vm/vms_tag.entity';
import { Repository } from 'typeorm';
import { CreateVMTagDTO, UpdateVMTagDTO } from './vms_tag.dto';

@Injectable()
export class VmsTagService {
    constructor(
        @InjectRepository(VMsTag)
        private readonly vmsTagRepo: Repository<VMsTag>,
    ){}
    // Listing all existing vmTag data
    async listing(): Promise<any>{
        const entities = await this.vmsTagRepo.find();
        if(!entities){
            throw new NotFoundException('Data Not Found!');
        }
        return entities;
    }
    // Create new vm tag
    async create(body: CreateVMTagDTO): Promise<any>{
        try{
            const data = await this.vmsTagRepo.save(body);
            return {
                success: true,
                message: 'Data have been created successfully!',
                data: data
            }
        }catch(err){
            throw new BadRequestException(err);
        }
    }
    // Update vm tag by id
    async update(id: number, body: UpdateVMTagDTO): Promise<any>{
        const isExist = await this.vmsTagRepo.findOneBy({id: id});
        if(!isExist){
            throw new NotFoundException('Invalid VM Tag!');
        }
        try{
            await this.vmsTagRepo.update(
                {
                    id: id
                },
                {
                    name: body.name,
                    color: body.color
                }
            );
            const data = await this.vmsTagRepo.findOneBy({id: id});
            return {
                success: true,
                message: 'Data have been updated successfully!',
                data: data
            }
        }catch(err){
            throw new BadRequestException(err);
        }
    }
    // Delete vm tag by id
    async delete(id: number): Promise<any>{
        const isExist = await this.vmsTagRepo.findOneBy({id: id});
        if (!isExist) {
            throw new NotFoundException('Invalid VM Tag!');
        }
        try{
            await this.vmsTagRepo.delete(id);
            return{
                success: true,
                message: 'Data have been deleted successfully!'
            }
        }catch(err){
            throw new BadRequestException(err);
        }
    }

}
