/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VMsOS } from 'src/entity/vm/vms_os.entity';
import { Repository } from 'typeorm';
import { CreateVMOsDTO, UpdateVMOsDTO } from './vms_os.dto';
import { fileHandler } from 'src/utils/base64/Handler';

@Injectable()
export class VmsOsService {
    constructor(
        @InjectRepository(VMsOS)
        private readonly vmsOsVMsOSRepo: Repository<VMsOS>,
    ){}
    // Listing all existing vmOsVMsOS data
    async listing(): Promise<any>{
        const entities = await this.vmsOsVMsOSRepo.find();
    if (!entities) {
            throw new NotFoundException('Data Not Found!');
        }
        return entities;
    }
    // Create new vm VMsOS
    async create(body: CreateVMOsDTO): Promise<any>{
        let fileUpload = null;

        if(body.icon){
            fileUpload = await fileHandler(body.icon);
        }
        try{
            const data = await this.vmsOsVMsOSRepo.save(
                {
                    name: body.name,
                    icon: fileUpload? fileUpload.data.uri : null
                }
            );
            return {
                success: true,
                message: 'Data have been created successfully!',
                data: data
            }
        }catch(err){
            throw new BadRequestException(err);
        }
    }
    // Update vm OsVMsOS by id
    async update(id: number, body: UpdateVMOsDTO): Promise<any>{
        const isExist = await this.vmsOsVMsOSRepo.findOneBy({id: id});
        if(!isExist){
            throw new NotFoundException('Invalid VM VMsOS!');
        }
        let fileUpload = null;

        if(body.icon){
            fileUpload = await fileHandler(body.icon);
        }
        try{
            await this.vmsOsVMsOSRepo.update(
                {
                    id: id
                },
                {
                    name: body.name,
                    icon: fileUpload? fileUpload.data.uri : null
                }
            );
            const data = await this.vmsOsVMsOSRepo.findOneBy({id: id});
            return {
                success: true,
                message: 'Data have been updated successfully!',
                data: data
            }
        }catch(err){
            throw new BadRequestException(err);
        }
    }
    // Delete vm OsVMsOS by id
    async delete(id: number): Promise<any>{
        const isExist = await this.vmsOsVMsOSRepo.findOneBy({id: id});
        if (!isExist) {
            throw new NotFoundException('Invalid VM VMsOS!');
        }
        try{
            await this.vmsOsVMsOSRepo.delete(id);
            return{
                success: true,
                message: 'Data have been deleted successfully!'
            }
        }catch(err){
            throw new BadRequestException(err);
        }
    }
}
