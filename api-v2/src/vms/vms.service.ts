/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VMs } from 'src/entity/vm/vms.entity';
import { VMsEnv } from 'src/entity/vm/vms_env.entity';
import { VMsOS } from 'src/entity/vm/vms_os.entity';
import { VMsStatus } from 'src/entity/vm/vms_status.entity';
import { VMsTag } from 'src/entity/vm/vms_tag.entity';
import { PageDto, PageMetaDto, PageOptionDTO } from 'src/utils/pagination/pagination.dto';
import { Repository } from 'typeorm';
import { CreateVMDTO, UpdateVMDTO } from './vms.dto';

@Injectable()
export class VmsService {
    constructor(
        @InjectRepository(VMs)
        private readonly vmsRepo: Repository<VMs>,
        @InjectRepository(VMsEnv)
        private readonly envRepo: Repository<VMsEnv>,
        @InjectRepository(VMsOS)
        private readonly osRepo: Repository<VMsOS>,
        @InjectRepository(VMsTag)
        private readonly tagRepo: Repository<VMsTag>,
        @InjectRepository(VMsStatus)
        private readonly statusRepo: Repository<VMsStatus>,
    ){}
    // Listing all existing vm data
    async findAllVm(pageOptionDTO: PageOptionDTO): Promise<PageDto<VMs>>{
        const entities = await this.vmsRepo.find(
            {
                order: {
                    created_at: pageOptionDTO.order
                },
                relations:{
                    env: true,
                    os: true,
                    tag: true,
                    status: true,
                    projectsAppEnvs: true,
                    VMAccess: true
                },
                select:{
                    env: {
                        id: true,
                        name: true,
                    },
                    os: {
                        id: true,
                        name: true,
                    },
                    tag: {
                        id: true,
                        name: true,
                    },
                    status: {
                        id: true,
                        name: true,
                    },
                },
                skip: pageOptionDTO.skip,
                take: pageOptionDTO.limit,
            }
        )
        if(!entities){
            throw new NotFoundException('Data Not Found!');
        }
        const itemCount = await this.vmsRepo.count();
        const pageMetaDto = new PageMetaDto({ itemCount, pageOptionDTO });
        return new PageDto(entities, pageMetaDto);
    }
    // List By id 
    async listById(id:number): Promise<any>{
        const isExist   = await this.vmsRepo.findOneBy({id: id});
        if(!isExist){
            throw new NotFoundException('Data Not Found!');
        }
        return {
            success: true,
            data: isExist
        }
    }
    // create new vm
    async create(body: CreateVMDTO): Promise<any>{
        const env = await this.envRepo.findOneBy({ id:body.env_id })
        if(!env){
            throw new BadRequestException(`Environment with id=${body.env_id} not found!`);
        }
        const os = await this.osRepo.findOneBy({ id: body.os_id })
        if(!os){
            throw new BadRequestException(`OS with id=${body.os_id} not found!`)
        }
        const tag = await this.tagRepo.findOneBy({ id: body.tag_id })
        if(!tag){
            throw new BadRequestException(`Tag with id=${body.tag_id} not found!`)
        }
        const status = await this.statusRepo.findOneBy({ id: body.status_id})
        if(!status){
            throw new BadRequestException(`Status with id=${body.status_id} not found!`)
        }
        const vm = await this.vmsRepo.save(body);
        return {
            success: true,
            message: 'VM Created Successfully!',
            data: vm
        }

    }

    // update vm by id
    async update(id: number, body: UpdateVMDTO): Promise<any>{
        const vm = await this.vmsRepo.findOneBy({ id: id});
        if(!vm){
            throw new NotFoundException('Invalid vm!');
        }
        const env = await this.envRepo.findOneBy({ id:body.env_id })
        if(!env){
            throw new BadRequestException(`Environment with id=${body.env_id} not found!`);
        }
        const os = await this.osRepo.findOneBy({ id: body.os_id })
        if(!os){
            throw new BadRequestException(`OS with id=${body.os_id} not found!`)
        }
        const tag = await this.tagRepo.findOneBy({ id: body.tag_id })
        if(!tag){
            throw new BadRequestException(`Tag with id=${body.tag_id} not found!`)
        }
        const status = await this.statusRepo.findOneBy({ id: body.status_id})
        if(!status){
            throw new BadRequestException(`Status with id=${body.status_id} not found!`)
        }
        await this.vmsRepo.update(id,
            {
                env: env,
                os: os,
                tag: tag,
                status: tag,
                name: body.name,
                private_ip: body.private_ip,
                public_ip: body.public_ip,
                ram: body.ram,
                hdd: body.hdd,
                core: body.core,
                os_version: body.os_version,
                note: body.note
            }
        );
        const updatedVM = await this.vmsRepo.findOneBy({id: id});
        return {
            success: true,
            message: 'VM Updated Successfully!',
            data: updatedVM
        }
    }

    // delete vm by id 
    async delete(id: number): Promise<any>{
        const vm = await this.vmsRepo.findOneBy({ id : id });
        if(!vm){
            throw new NotFoundException('Invalid VM!');
        }
        await this.vmsRepo.delete(id);
        return {
            success: true,
            message: `VM with id=${id} have been deleted successfully`
        }
    }

    // data-setup 
    async listDataSetup(): Promise<any>{
        try{
            const vmEnv     =   await this.envRepo.find(
                {
                    select:{
                        id: true,
                        name: true
                    }
                }
            );
            const vmOs      =   await this.osRepo.find(
                {
                    select: {
                        id: true,
                        name: true,
                        icon: true,
                    }
                }
            );
            const vmTag     =   await this.tagRepo.find(
                {
                    select: {
                        id: true,
                        name: true,
                        color: true
                    }
                }
            );
            const vmStatus  =   await this.statusRepo.find(
                {
                    select: {
                        id: true,
                        name: true,
                        color: true,
                    }
                }
            );
            return {
                success: true,
                setup:{
                    env: vmEnv,
                    os: vmOs,
                    tag: vmTag,
                    status: vmStatus
                }
            }
        }catch(err){
            throw new BadRequestException(err);
        }
        
    }
}
