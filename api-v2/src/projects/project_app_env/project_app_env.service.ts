/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectsApp } from 'src/entity/project/projects_app.entity';
import { ProjectsAppEnv } from 'src/entity/project/projects_app_env.entity';
import { Repository } from 'typeorm';
import { createProjectAppEnvDTO, updateProjectAppEnvDTO } from './project_app_env.dto';
import { VMsEnv } from 'src/entity/vm/vms_env.entity';
import { VMs } from 'src/entity/vm/vms.entity';

@Injectable()
export class ProjectAppEnvService {
    constructor(
        @InjectRepository(ProjectsAppEnv)
        private projectAppEnvRepository: Repository<ProjectsAppEnv>,
        @InjectRepository(ProjectsApp)
        private projectAppRepository: Repository<ProjectsApp>,
        @InjectRepository(VMsEnv)
        private envRepository: Repository<VMsEnv>,
        @InjectRepository(VMs)
        private vmRepository: Repository<VMs>,

    ){}
    async listing(): Promise<any>{
        try{
            return await this.projectAppEnvRepository.find(
                {
                    relations:{
                        ProjectsApp: true,
                        VMsEnv: true,
                        VMs: true,
                    },
                    select: {
                        ProjectsApp: {
                            id: true,
                            name: true,
                        },
                        VMsEnv: {
                            id: true,
                            name: true,
   
                        },
                        VMs: {
                            id: true,
                            name: true,
                            private_ip: true,
                            public_ip: true,
                            ram: true,
                            hdd: true,
                            core: true,
                            os_version: true
                        }
                    }
                }
            );
        }catch(err){
            throw new NotFoundException(err);
        }
    }
    async create(body: createProjectAppEnvDTO): Promise<any>{
        const isAppExist   = await this.projectAppRepository.findOneBy({id: body.app_id});
        if(!isAppExist){
            throw new NotFoundException('Invalid Project App ID!');
        }
        const isEnvExist = await this.envRepository.findOneBy({id: body.env_id});
        if(!isEnvExist){
            throw new NotFoundException('Invalid Env ID!');
        }
        const isVmExist = await this.vmRepository.findOneBy({id: body.vm_id});
        if(!isVmExist){
            throw new NotFoundException('Invalid VM ID!');
        }
        try{
            const toSave = await this.projectAppEnvRepository.save(
                {
                    ProjectsApp: isAppExist,
                    VMsEnv: isEnvExist,
                    VMs: isVmExist,
                    url: body.url,
                    port: body.port,
                    note: body.note
                }
            )
            const data  = await this.projectAppEnvRepository.find(
                {
                    where:{
                        id: toSave.id
                    },
                    relations:{
                        ProjectsApp: true,
                        VMsEnv: true,
                        VMs: true,
                    },
                    select: {
                        ProjectsApp: {
                            id: true,
                        },
                        VMsEnv: {
                            id: true,
                        },
                        VMs: {
                            id: true,
                        }
                    }
                }
            )
            return {
                success: true,
                message: 'Data have been created successfully!',
                data: data
            }
        }catch(err){
            throw new BadRequestException(err);
        }
    }
    async update(id: number , body: updateProjectAppEnvDTO): Promise<any>{
        const isExist = await this.projectAppEnvRepository.findOneBy({id: id});
        if(!isExist){
            throw new NotFoundException('Invalid Project App Env ID!');
        }
        const isAppExist   = await this.projectAppRepository.findOneBy({id: body.app_id});
        if(!isAppExist){
            throw new NotFoundException('Invalid Project App ID!');
        }
        const isEnvExist = await this.envRepository.findOneBy({id: body.env_id});
        if(!isEnvExist){
            throw new NotFoundException('Invalid Env ID!');
        }
        const isVmExist = await this.vmRepository.findOneBy({id: body.vm_id});
        if(!isVmExist){
            throw new NotFoundException('Invalid VM ID!');
        }
        try{
            await this.projectAppEnvRepository.update(
                {
                    id: id
                },
                {
                    ProjectsApp: isAppExist,
                    VMsEnv: isEnvExist,
                    VMs: isVmExist,
                    url: body.url,
                    port: body.port,
                    note: body.note
                }
            );
            const data  = await this.projectAppEnvRepository.find(
                {
                    where:{
                        id: id
                    },
                    relations:{
                        ProjectsApp: true,
                        VMsEnv: true,
                        VMs: true,
                    },
                    select: {
                        ProjectsApp: {
                            id: true,
                        },
                        VMsEnv: {
                            id: true,
                        },
                        VMs: {
                            id: true,
                        }
                    }
                }
            )
            return {
                success: true,
                message: 'Data have been updated successfully!',
                data: data
            }
        }catch (err){
            throw new BadRequestException(err);
        }
    }
    async delete(id: number): Promise<any>{
        const isExist = await this.projectAppEnvRepository.findOneBy({id: id});
        if(!isExist){
            throw new NotFoundException('Invalid Project App Env ID!');
        }
        try{
            await this.projectAppEnvRepository.delete(id);
            return {
                success: true,
                message: 'Data have been deleted successfully!'
            }
        }catch(err){
            throw new BadRequestException(err);
        }
    }
    async listById(id: number): Promise<any>{
        const isExist = await this.projectAppRepository.findOneBy({id: id});
        if(!isExist){
            throw new NotFoundException('Invalid Project App Env ID!');
        }
        try{
            return this.projectAppEnvRepository.find(
                {
                    where:{
                        id: id
                    },
                    relations:{
                        ProjectsApp: true,
                        VMsEnv: true,
                        VMs: true,
                    },
                    select: {
                        ProjectsApp: {
                            id: true,
                            name: true,
                            tech_version: true
                        },
                        VMsEnv: {
                            id: true,
                            name: true
                        },
                        VMs: {
                            id: true,
                            name: true,
                            private_ip: true,
                            public_ip: true,
                            ram: true,
                            hdd: true,
                            os_version: true,

                        }
                    }
                }
            );
        }catch(err){
            throw new NotFoundException(err);
        }
    }
    async data_setup(): Promise<any>{
        try{
            const projectApp           =   await this.projectAppRepository.find(
                {
                    select: {
                        id: true,
                        name: true
                    }
                }
            );
            const env              =   await this.envRepository.find(
                {
                    select: {
                        id: true,
                        name: true
                    }
                }
            );
            const vm                 =   await this.vmRepository.find(
                {
                    select: {
                        id: true,
                        name: true,
                    }
                }
            );
            
            return {
                success: true,
                setup:{
                    ProjectApp: projectApp,
                    Env: env,
                    VM: vm
                }
            }
        }catch(err){
            throw new BadRequestException(err);
        }
    }

    
}
