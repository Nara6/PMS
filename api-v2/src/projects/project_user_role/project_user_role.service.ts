/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectsUserRole } from 'src/entity/project/projects_user_role.entity';
import { Repository } from 'typeorm';
import { CreateProjectUserRoleDTO, UpdateProjectUserRoleDTO } from './project_user_role.dto';

@Injectable()
export class ProjectUserRoleService {
    constructor(
        @InjectRepository(ProjectsUserRole)
        private projectUserRoleRepo: Repository<ProjectsUserRole>
    ){}
    async listing(): Promise<any>{
        try{
            return await this.projectUserRoleRepo.find();
        }catch(err){
            throw new NotFoundException(err);
        }
    }
    async create(body: CreateProjectUserRoleDTO): Promise<any>{
        try{
            const data = await this.projectUserRoleRepo.save(body);
            return {
                success: true,
                message: 'Data have been created successfully!',
                data: data
            }
        }catch(err){
            throw new BadRequestException(err);
        }
    }
    async update(id: number , body: UpdateProjectUserRoleDTO): Promise<any>{
        const isExist = await this.projectUserRoleRepo.findOneBy({id: id});
        if(!isExist){
            throw new NotFoundException('Invalid Project User Role ID!');
        }
        try{
            await this.projectUserRoleRepo.update(
                {
                    id: id
                },
                {
                    name: body.name,
                    abbre: body.abbre
                }
            );
            const data = await this.projectUserRoleRepo.findOneBy({id: id});
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
        const isExist = await this.projectUserRoleRepo.findOneBy({id: id});
        if(!isExist){
            throw new NotFoundException('Invalid Project User Role ID!');
        }
        try{
            await this.projectUserRoleRepo.delete(id);
            return {
                success: true,
                message: 'Data have been deleted successfully!'
            }
        }catch(err){
            throw new BadRequestException(err);
        }
    }
}
