/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectsApp } from 'src/entity/project/projects_app.entity';
import { ProjectsAppType } from 'src/entity/project/projects_app_type.entity';
import { Repository } from 'typeorm';
import { CreateProjectAppDTO, UpdateProjectAppDTO } from './project_app.dto';
import { Projects } from 'src/entity/project/projects.entity';
import { Tech } from 'src/entity/technology/tech.entity';

@Injectable()
export class ProjectAppService {
    constructor(
        @InjectRepository(ProjectsApp)
        private projectAppRepository: Repository<ProjectsApp>,
        @InjectRepository(ProjectsAppType)
        private projectAppTypeRepository: Repository<ProjectsAppType>,
        @InjectRepository(Projects)
        private projectRepository: Repository<Projects>,
        @InjectRepository(Tech)
        private techRepository: Repository<Tech>,

    ){}
    async listing(): Promise<any>{
        try{
            return await this.projectAppRepository.find(
                {
                    relations:{
                        ProjectsAppType: true,
                        Projects: true,
                        tech: true,
                    },
                    select: {
                        ProjectsAppType: {
                            id: true,
                            name: true,
                        },
                        Projects: {
                            id: true,
                            en_name: true,
                            kh_name: true,
                            abbre: true
                        },
                        tech: {
                            id: true,
                            name: true,
                            language: true,
                        }
                    }
                }
            );
        }catch(err){
            throw new NotFoundException(err);
        }
    }
    async create(body: CreateProjectAppDTO): Promise<any>{
        const isTypeExist   = await this.projectAppTypeRepository.findOneBy({id: body.type_id});
        if(!isTypeExist){
            throw new NotFoundException('Invalid Project App Type ID!');
        }
        const isProjectExist = await this.projectRepository.findOneBy({id: body.project_id});
        if(!isProjectExist){
            throw new NotFoundException('Invalid Project ID!');
        }
        const isTechExist = await this.techRepository.findOneBy({id: body.tech_id});
        if(!isTechExist){
            throw new NotFoundException('Invalid Tech ID!');
        }
        try{
            const toSave = await this.projectAppRepository.save(
                {
                    ProjectsAppType: isTypeExist,
                    Projects: isProjectExist,
                    tech: isTechExist,
                    name: body.name,
                    tech_version: body.tech_version,
                    description: body.description,
                }
            )
            const data  = await this.projectAppRepository.find(
                {
                    where:{
                        id: toSave.id
                    },
                    relations:{
                        ProjectsAppType: true,
                        Projects: true,
                        tech: true,
                    },
                    select: {
                        ProjectsAppType: {
                            id: true,
                        },
                        Projects: {
                            id: true,
                        },
                        tech: {
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
    async update(id: number , body: UpdateProjectAppDTO): Promise<any>{
        const isExist = await this.projectAppRepository.findOneBy({id: id});
        if(!isExist){
            throw new NotFoundException('Invalid Project App ID!');
        }
        const isTypeExist   = await this.projectAppTypeRepository.findOneBy({id: body.type_id});
        if(!isTypeExist){
            throw new NotFoundException('Invalid Project App Type ID!');
        }
        const isProjectExist = await this.projectRepository.findOneBy({id: body.project_id});
        if(!isProjectExist){
            throw new NotFoundException('Invalid Project ID!');
        }
        const isTechExist = await this.techRepository.findOneBy({id: body.tech_id});
        if(!isTechExist){
            throw new NotFoundException('Invalid Tech ID!');
        }
        try{
            await this.projectAppRepository.update(
                {
                    id: id
                },
                {
                    ProjectsAppType: isTypeExist,
                    Projects: isProjectExist,
                    tech: isTechExist,
                    name: body.name,
                    tech_version: body.tech_version,
                    description: body.description
                }
            );
            const data  = await this.projectAppRepository.find(
                {
                    where:{
                        id: id
                    },
                    relations:{
                        ProjectsAppType: true,
                        Projects: true,
                        tech: true,
                    },
                    select: {
                        ProjectsAppType: {
                            id: true,
                        },
                        Projects: {
                            id: true,
                        },
                        tech: {
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
        const isExist = await this.projectAppRepository.findOneBy({id: id});
        if(!isExist){
            throw new NotFoundException('Invalid Project App ID!');
        }
        try{
            await this.projectAppRepository.delete(id);
            return {
                success: true,
                message: 'Data have been deleted successfully!'
            }
        }catch(err){
            throw new BadRequestException(err);
        }
    }
    async data_setup(): Promise<any>{
        try{
            const projectAppType       =   await this.projectAppTypeRepository.find(
                {
                    select: {
                        id: true,
                        name: true
                    }
                }
            );
            const project              =   await this.projectRepository.find(
                {
                    select: {
                        id: true,
                        kh_name: true,
                        en_name: true,
                    }
                }
            );
            const tech                 =   await this.techRepository.find(
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
                    ProjectAppType: projectAppType,
                    Project: project,
                    Tech: tech
                }
            }
        }catch(err){
            throw new BadRequestException(err);
        }
    }
    async listById(id: number): Promise<any>{
        const isExist = await this.projectAppRepository.findOneBy({id: id});
        if(!isExist){
            throw new NotFoundException('Invalid Project App ID!');
        }
        try{
            return this.projectAppRepository.find(
                {
                    where: {
                        id: id
                    },
                    relations:{
                        ProjectsAppType: true,
                        Projects: true,
                        tech: true,
                    },
                    select: {
                        ProjectsAppType: {
                            id: true,
                            name: true,
                        },
                        Projects: {
                            id: true,
                            en_name: true,
                            kh_name: true,
                            abbre: true
                        },
                        tech: {
                            id: true,
                            name: true,
                            language: true,
                        }
                    }
                }
            );
        }catch(err){
            throw new NotFoundException(err);
        }
    }

}
