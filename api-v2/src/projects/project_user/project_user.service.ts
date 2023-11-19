/* eslint-disable prettier/prettier */
import { BadRequestException, Body, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectsUser } from 'src/entity/project/projects_user.entity';
import { Repository } from 'typeorm';
import { CreateProjectUserDTO, UpdateProjectUserDTO} from './project_user.dto';
import { Projects } from 'src/entity/project/projects.entity';
import { Users } from 'src/entity/user/users.entity';
import { ProjectsUserRole } from 'src/entity/project/projects_user_role.entity';
import { PageDto, PageMetaDto, PageOptionDTO } from 'src/utils/pagination/pagination.dto';

@Injectable()
export class ProjectUserService {
    constructor(
        @InjectRepository(ProjectsUser)
        private projectUserRepo: Repository<ProjectsUser>,
        @InjectRepository(Projects)
        private projectRepository: Repository<Projects>,
        @InjectRepository(Users)
        private userRepository: Repository<Users>,
        @InjectRepository(ProjectsUserRole)
        private roleRepository: Repository<ProjectsUserRole>,

    ){}
    async listing(pageOptionDTO: PageOptionDTO): Promise<PageDto<ProjectsUser>>{
        try{
            const entities = await this.projectUserRepo.find(
                {
                    order: {
                        created_at: pageOptionDTO.order
                    },
                    relations:{
                        ProjectsUser: {
                            ProjectsType: true,
                            ProjectsStatus: true,
                        },
                        Users: {
                            department: true,
                            office: true,
                            position: true,
                            title: true,
                            role: true,
                        },
                        ProjectsUserRole: true,
                    },
                    select: {
                        ProjectsUser: {
                            id: true,
                            kh_name: true,
                            en_name: true,
                            abbre: true,
                            icon: true,
                            ProjectsType:{
                                id: true,
                                name: true,
                            },
                            ProjectsStatus:{
                                id: true,
                                name: true,
                                color: true,
                            }
                        },
                        Users: {
                            id: true,
                            kh_name: true,
                            en_name: true,
                            vpn_account: true,
                            avatar: true,
                            username: true,
                            phone: true,
                            tg_username: true,
                            department: {
                                id: true,
                                en_name: true,
                                kh_name: true,
                            },
                            office: {
                                id:true,
                                en_name: true,
                                kh_name: true,
                            },
                            position:{
                                id:true,
                                en_name: true,
                                kh_name: true,
                            },
                            title: {
                                id:true,
                                en_name: true,
                                kh_name: true,
                            },
                            role: {
                                id:true,
                                en_name: true,
                                kh_name: true,
                            }
                        },
                        ProjectsUserRole: {
                            id: true,
                            name: true,
                            abbre: true
                        }
                    },
                    skip: pageOptionDTO.skip,
                    take: pageOptionDTO.limit,
                }
            );
            const itemCount = await this.projectUserRepo.count();
            const pageMetaDto = new PageMetaDto({ itemCount, pageOptionDTO });
            return new PageDto(entities, pageMetaDto);

        }catch(err){
            throw new NotFoundException(err);
        }
    }
    async listById(id: number): Promise<any>{
        const isExist = await this.projectUserRepo.findOneBy({id: id});
        if(!isExist){
            throw new NotFoundException('Invalid Project User ID!');
        }
        try{
            return this.projectUserRepo.find(
                {
                    where:{
                        id: id
                    },
                    relations:{
                        ProjectsUser: {
                            ProjectsType: true,
                            ProjectsStatus: true,
                        },
                        Users: {
                            department: true,
                            office: true,
                            position: true,
                            title: true,
                            role: true,
                        },
                        ProjectsUserRole: true,
                    },
                    select: {
                        ProjectsUser: {
                            id: true,
                            kh_name: true,
                            en_name: true,
                            abbre: true,
                            icon: true,
                            ProjectsType:{
                                id: true,
                                name: true,
                            },
                            ProjectsStatus:{
                                id: true,
                                name: true,
                                color: true,
                            }
                        },
                        Users: {
                            id: true,
                            kh_name: true,
                            en_name: true,
                            vpn_account: true,
                            avatar: true,
                            username: true,
                            phone: true,
                            tg_username: true,
                            department: {
                                id: true,
                                en_name: true,
                                kh_name: true,
                            },
                            office: {
                                id:true,
                                en_name: true,
                                kh_name: true,
                            },
                            position:{
                                id:true,
                                en_name: true,
                                kh_name: true,
                            },
                            title: {
                                id:true,
                                en_name: true,
                                kh_name: true,
                            },
                            role: {
                                id:true,
                                en_name: true,
                                kh_name: true,
                            }
                        },
                        ProjectsUserRole: {
                            id: true,
                            name: true,
                            abbre: true
                        }
                    },
                }
            );
        }catch(err){
            throw new NotFoundException(err);
        }
    }
    async create(body: CreateProjectUserDTO): Promise<any>{
        const isProjectExist = await this.projectRepository.findOneBy({id: body.project_id})
        if(!isProjectExist){
            throw new NotFoundException('Invalid Project ID!');
        }
        const isUserExist    = await this.userRepository.findOneBy({id: body.user_id});
        if(!isUserExist){
            throw new NotFoundException('Invalid User ID!');
        }
        const isRoleExist    = await this.roleRepository.findOneBy({id: body.role_id});
        if(!isRoleExist){
            throw new NotFoundException('Invalid Project User Role ID!');
        }
        try{
            const toSave     = await this.projectUserRepo.save(
                {
                    ProjectsUser: isProjectExist,
                    Users: isUserExist,
                    ProjectsUserRole: isRoleExist
                }
            );
            const data       = await this.projectUserRepo.find(
                {
                    where: {
                        id: toSave.id
                    },
                    relations:{
                        ProjectsUser:       true,
                        Users:              true,
                        ProjectsUserRole:   true
                    },
                    select:{
                        ProjectsUser: {
                            id: true,
                        },
                        Users: {
                            id: true,
                        },
                        ProjectsUserRole: {
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
        }catch (err){
            throw new BadRequestException(err);
        }
    }
    async update(id: number, body: UpdateProjectUserDTO): Promise<any>{
        const isExist = await this.projectUserRepo.findOneBy({id: id});
        if(!isExist){
            throw new NotFoundException('Invalid Project User ID!');
        }
        const isProjectExist = await this.projectRepository.findOneBy({id: body.project_id})
        if(!isProjectExist){
            throw new NotFoundException('Invalid Project ID!');
        }
        const isUserExist    = await this.userRepository.findOneBy({id: body.user_id});
        if(!isUserExist){
            throw new NotFoundException('Invalid User ID!');
        }
        const isRoleExist    = await this.roleRepository.findOneBy({id: body.role_id});
        if(!isRoleExist){
            throw new NotFoundException('Invalid Project User Role ID!');
        }
        try{
            await this.projectUserRepo.update(
                {
                    id: id
                },
                {
                    ProjectsUser: isProjectExist,
                    Users: isUserExist,
                    ProjectsUserRole: isRoleExist
                }
            );
            const data       = await this.projectUserRepo.find(
                {
                    where: {
                        id: id
                    },
                    relations:{
                        ProjectsUser:       true,
                        Users:              true,
                        ProjectsUserRole:   true
                    },
                    select:{
                        ProjectsUser: {
                            id: true,
                        },
                        Users: {
                            id: true,
                        },
                        ProjectsUserRole: {
                            id: true,
                        }
                    }
                }
            );
            return {
                success: true,
                message: 'Data have been updated successfully!',
                data: data
            }
        }catch(err){
            throw new BadRequestException(err);
        }
    }
    async delete(id: number): Promise<any>{
        const isExist = await this.projectUserRepo.findOneBy({id: id});
        if(!isExist){
            throw new NotFoundException('Invalid Project User ID!');
        }
        try{
            await this.projectUserRepo.delete(id);
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
            const project             =   await this.projectRepository.find(
                {
                    select: {
                        id: true,
                        kh_name: true,
                        en_name: true,
                    }
                }
            );
            const user                 =   await this.userRepository.find(
                {
                    select: {
                        id: true,
                        kh_name: true,
                        en_name: true,
                    }
                }
            );
            const role                 =   await this.roleRepository.find(
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
                    Projects:            project,
                    Users:               user,
                    ProjectUserRoles:    role
                }
            }
        }catch(err){
            throw new BadRequestException(err);
        }
    }
}
