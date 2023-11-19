/* eslint-disable prefer-const */
/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Projects } from 'src/entity/project/projects.entity';
import { Repository } from 'typeorm';
import { CreateProjectDTO, UpdateProjectDTO } from './projects.dto';
import { ProjectsType } from 'src/entity/project/projects_type.entity';
import { ProjectsStatus } from 'src/entity/project/projects_status.entity';
import { fileHandler } from 'src/utils/base64/Handler';
import { Users } from 'src/entity/user/users.entity';
import { ProjectsUserRole } from 'src/entity/project/projects_user_role.entity';

@Injectable()
export class ProjectsService {
    constructor(
        @InjectRepository(Projects)
        private projectRepository: Repository<Projects>,

        @InjectRepository(ProjectsType)
        private projectTypeRepository: Repository<ProjectsType>,

        @InjectRepository(ProjectsStatus)
        private projectStatusRepository: Repository<ProjectsStatus>,
    
        @InjectRepository(Users)
        private projectUserRepository: Repository<Users>,

        @InjectRepository(ProjectsUserRole)
        private projectUserRoleRepository: Repository<ProjectsUserRole>,
    ){}
    async listing(): Promise<any>{
        try{
            return await this.projectRepository.find(
                {
                    order: {
                        // en_name: 'ASC',
                        id: 'ASC',
                        updated_at: 'DESC'
                    },
                    relations:{
                        ProjectsType: true,
                        ProjectsStatus: true,
                        ProjectsTask: {
                            ProjectsTaskStatus: true
                        },
                        ProjectsTimeLine: true,
                        ProjectsUser: {
                            Users: true,
                            ProjectsUserRole: true
                        }
                    },
                    select: {
                        ProjectsType: {
                            id: true,
                            name: true,
                        },
                        ProjectsStatus: {
                            id: true,
                            name: true,
                            color: true
                        },
                        ProjectsTask:{
                            id: true,
                            name: true,
                            description: true,
                            due_date: true,
                            created_at: true,
                            ProjectsTaskStatus:{
                                id: true,
                                name: true,
                                color: true
                            }
                        },
                        ProjectsUser: {
                            id: true,
                            Users: {
                                id: true,
                                en_name: true,
                                kh_name: true,
                                avatar: true
                            },
                            ProjectsUserRole: {
                                id: true,
                                name: true,
                                abbre: true
                            }
                        }
                    }
                }
            );
        }catch(err){
            throw new NotFoundException(err);
        }
    }
    async create(body: CreateProjectDTO): Promise<any>{
        const isTypeExist   = await this.projectTypeRepository.findOneBy({id: body.type_id});
        if(!isTypeExist){
            throw new NotFoundException('Invalid Project Type ID!');
        }
        const isStatusExist = await this.projectStatusRepository.findOneBy({id: body.status_id});
        if(!isStatusExist){
            throw new NotFoundException('Invalid Project Status ID!');
        }
        if(body.start_date > body.due_date){
            throw new BadRequestException('Start Date must not bigger than Due Date!');
        }

        let fileUpload = null;

        if(body.icon){
            fileUpload = await fileHandler(body.icon);
        }
  
        try{
            const data = await this.projectRepository.save(
                {
                    ProjectsType: isTypeExist,
                    ProjectsStatus: isStatusExist,
                    kh_name: body.kh_name,
                    en_name: body.en_name,
                    abbre: body.abbre,
                    icon: fileUpload? fileUpload.data.uri : null,
                    start_date: body.start_date,
                    due_date: body.due_date,
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
    async update(id: number , body: UpdateProjectDTO): Promise<any>{
        // console.log(id);
        
        const isExist = await this.projectRepository.findOneBy({id:id});
        // console.log(isExist);
        
        if(!isExist){
            throw new NotFoundException('Invalid Project ID!');
        }
        const isTypeExist   = await this.projectTypeRepository.findOneBy({id: body.type_id});
        if(!isTypeExist){
            throw new NotFoundException('Invalid Project Type ID!');
        }
        // console.log(body);
        
        const isStatusExist = await this.projectStatusRepository.findOne(
            {
                where: {
                    id: body.status_id
                }
            }
        );
        // console.log(isStatusExist);
        if(!isStatusExist){
            throw new NotFoundException('Invalid Project Status ID!');
        }
        if(body.start_date > body.due_date){
            throw new BadRequestException('Start Date must not bigger than Due Date!');
        }
        let fileUpload = null;
        // console.log(isExist.icon, body.icon);
        
        if(body.icon!==isExist.icon ){
            // console.log('hi');

            fileUpload = await fileHandler(body.icon);
            
        }
        try{
            await this.projectRepository.update(
                {
                    id: id
                },
                {
                    ProjectsType: isTypeExist,
                    ProjectsStatus: isStatusExist,
                    kh_name: body.kh_name,
                    en_name: body.en_name,
                    abbre: body.abbre,
                    icon: fileUpload? fileUpload.data.uri : isExist.icon,
                    start_date: body.start_date,
                    due_date: body.due_date,

                }
            );
            const data = await this.projectRepository.find(
                {
                    where: {
                        id: id
                    },
                    relations:{
                        ProjectsType: true,
                        ProjectsStatus: true,
                    },
                    select: {
                        ProjectsType:{
                            name: true,
                        },
                        ProjectsStatus:{
                            name: true,
                        }
                    }
                }
            );
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
        const isExist = await this.projectRepository.findOneBy({id: id});
        if(!isExist){
            throw new NotFoundException('Invalid Project ID!');
        }
        try{
            await this.projectRepository.delete(id);
            return {
                success: true,
                message: 'Data have been deleted successfully!'
            }
        }catch(err){
            throw new BadRequestException(err);
        }
    }
    async listById(id: number): Promise<any>{
        const isExist = await this.projectRepository.findOneBy({id: id});
        if(!isExist){
            throw new NotFoundException('Invalid Project ID!');
        }
        try{
            return this.projectRepository.find(
                {
                    where: {
                        id: id
                    },
                    relations:{
                        ProjectsType: true,
                        ProjectsStatus: true,
                    },
                    select: {
                        ProjectsType:{
                            name: true,
                        },
                        ProjectsStatus:{
                            name: true,
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
            const projectType       =   await this.projectTypeRepository.find(
                {
                    select: {
                        id: true,
                        name: true
                    }
                }
            );

            const projectUser       =   await this.projectUserRepository.find(
                {
                    select: {
                        id: true,
                        en_name: true,
                        kh_name: true,
                        avatar: true,
                    }
                }
            );

            const projectUserRole       =   await this.projectUserRoleRepository.find(
                {
                    select: {
                        id: true,
                        name: true,
                        abbre: true
                    }
                }
            );
            
            const projectStatus     =   await this.projectStatusRepository.find(
                {
                    select: {
                        id: true,
                        name: true
                    }
                }
            );
            
            return {
                success: true,
                setup:{
                    ProjectType: projectType,
                    ProjectStatus: projectStatus,
                    User: projectUser,
                    Role: projectUserRole
                }
            }
        }catch(err){
            throw new BadRequestException(err);
        }
    }
}
