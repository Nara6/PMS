/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VMsAccess } from 'src/entity/vm/vms_access.entity';
import { PageDto, PageMetaDto, PageOptionDTO } from 'src/utils/pagination/pagination.dto';
import { Repository } from 'typeorm';
import { CreateVMAccessDTO, UpdateVMAccessDTO } from './vms_access.dto';
import { VMsAccessType } from 'src/entity/vm/vms_access_type.entity';
import { VMs } from 'src/entity/vm/vms.entity';

@Injectable()
export class VmsAccessService {

    constructor(
        @InjectRepository(VMsAccess)
        private readonly vmsAccessRepo: Repository<VMsAccess>,
        @InjectRepository(VMsAccessType)
        private readonly vmsAccessTypeRepo: Repository<VMsAccessType>,
        @InjectRepository(VMs)
        private readonly vmsRepo: Repository<VMs>,
    ){}
    // Listing all existing vm data
    async listing(pageOptionDTO: PageOptionDTO): Promise<PageDto<VMsAccess>>{
        const entities = await this.vmsAccessRepo.find(
            {
                order: {
                    created_at: pageOptionDTO.order
                },
                relations:{
                    type: true,
                    from_vm: {
                        env: true,
                        os: true,
                        tag: true,
                        status: true,
                    },
                    to_vm: {
                        env: true,
                        os: true,
                        tag: true,
                        status: true,
                    }
                },
                select:{
                    type: {
                        id: true,
                        name: true,
                    },
                    from_vm: {
                        id: true,
                        name: true,
                        private_ip: true,
                        public_ip: true,
                        ram: true,
                        hdd: true,
                        core: true,
                        os_version: true,
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
                            name: true
                        }
                    },
                    to_vm: {
                        id: true,
                        name: true,
                        private_ip: true,
                        public_ip: true,
                        ram: true,
                        hdd: true,
                        core: true,
                        os_version: true,
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
                            name: true
                        }
                    },
                },
                skip: pageOptionDTO.skip,
                take: pageOptionDTO.limit,
            }
        )
        if(!entities){
            throw new NotFoundException('Data Not Found!');
        }
        const itemCount = await this.vmsAccessRepo.count();
        const pageMetaDto = new PageMetaDto({ itemCount, pageOptionDTO });
        return new PageDto(entities, pageMetaDto);
    }
    // create new vm access
    async create(body: CreateVMAccessDTO): Promise<any>{
        const vmsAccessType = await this.vmsAccessTypeRepo.findOneBy({ id:body.type_id })
        if(!vmsAccessType){
            throw new NotFoundException(`VM Access Type with id=${body.type_id} not found!`);
        }
        const from_vm = await this.vmsRepo.findOneBy({ id: body.from_vm_id });
        if(!from_vm){
            throw new NotFoundException(`VM with id=${body.from_vm_id} not found!`)
        }
        const to_vm = await this.vmsRepo.findOneBy({ id: body.to_vm_id });
        if(!to_vm){
            throw new NotFoundException(`VM with id=${body.to_vm_id} not found!`)
        }
        try{
            const toSave = await this.vmsAccessRepo.save(
                {
                    type: vmsAccessType,
                    from_vpn_acc_id: body.from_vpn_acc_id,
                    from_vm: from_vm,
                    to_vm: to_vm,
                    is_two_way: body.is_two_way,
                    vpn_user_id: body.vpn_user_id,
                    
                }
            );
            const data = await this.vmsAccessRepo.find(
                {
                    where: {id: toSave.id},
                    relations: {
                        type: true,
                        from_vm: true,
                        to_vm: true,
                    },
                    select:{
                        type: {
                            id: true,
                        },
                        from_vm: {
                            id: true
                        },
                        to_vm: {
                            id: true
                        }
                    }
                }
                
            );
            return {
                success: true,
                message: 'Data have been Created Successfully!',
                data: data
            }
        }catch(err){
            throw new BadRequestException(err);
        }
       
        

    }
    // update vm access
    async update(id: number, body: UpdateVMAccessDTO): Promise<any>{
        const isExist = await this.vmsAccessRepo.findOneBy({id: id});
        if(!isExist){
            throw new NotFoundException('Vm Access Not Found');
        }
        const vmsAccessType = await this.vmsAccessTypeRepo.findOneBy({ id:body.type_id })
        if(!vmsAccessType){
            throw new NotFoundException(`VM Access Type with id=${body.type_id} not found!`);
        }
        const from_vm = await this.vmsRepo.findOneBy({ id: body.from_vm_id });
        if(!from_vm){
            throw new NotFoundException(`VM with id=${body.from_vm_id} not found!`)
        }
        const to_vm = await this.vmsRepo.findOneBy({ id: body.to_vm_id });
        if(!to_vm){
            throw new NotFoundException(`VM with id=${body.to_vm_id} not found!`)
        }
        try{
            await this.vmsAccessRepo.update(
                {
                    id: id
                },
                {
                    type: vmsAccessType,
                    from_vpn_acc_id: body.from_vpn_acc_id,
                    from_vm: from_vm,
                    to_vm: to_vm,
                    is_two_way: body.is_two_way,
                    vpn_user_id: body.vpn_user_id,
                }
            )
            const data = await this.vmsAccessRepo.find(
                {
                    where: {id: id},
                    relations: {
                        type: true,
                        from_vm: true,
                        to_vm: true,
                    },
                    select:{
                        type: {
                            id: true,
                        },
                        from_vm: {
                            id: true
                        },
                        to_vm: {
                            id: true
                        }
                    }
                }
            );
            return {
                success: true,
                message: 'Data have been updated Successfully!',
                data: data
            }
        }catch(err){
            throw new BadRequestException(err);
        }
    }
    // delete vm access by id 
    async delete(id: number): Promise<any>{
        const vmAcess = await this.vmsAccessRepo.findOneBy({ id : id });
        if(!vmAcess){
            throw new NotFoundException('Invalid VM Access!');
        }
        await this.vmsAccessRepo.delete(id);
        return {
            success: true,
            message: `VM Access with id=${id} have been deleted successfully`
        }
    }
    // List By id 
    async listById(id:number): Promise<any>{
        const isExist   = await this.vmsAccessRepo.findOneBy({id: id});
        if(!isExist){
            throw new NotFoundException('Data Not Found!');
        }
        const data = await this.vmsAccessRepo.find(
            {
                where: {
                    id: id
                },
                relations:{
                    type: true,
                    from_vm: {
                        env: true,
                        os: true,
                        tag: true,
                        status: true,
                    },
                    to_vm: {
                        env: true,
                        os: true,
                        tag: true,
                        status: true,
                    }
                },
                select:{
                    type: {
                        id: true,
                        name: true,
                    },
                    from_vm: {
                        id: true,
                        name: true,
                        private_ip: true,
                        public_ip: true,
                        ram: true,
                        hdd: true,
                        core: true,
                        os_version: true,
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
                            name: true
                        }
                        
                    },
                    to_vm: {
                        id: true,
                        name: true,
                        private_ip: true,
                        public_ip: true,
                        ram: true,
                        hdd: true,
                        core: true,
                        os_version: true,
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
                            name: true
                        }
                        
                    },
                },
            }
        )
        return {
            success: true,
            data: data
        }
    }
}
