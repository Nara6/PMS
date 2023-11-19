/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectsAppType } from 'src/entity/project/projects_app_type.entity';
import { Repository } from 'typeorm';
import { CreateProjectAppTypeDTO, UpdateProjectAppTypeDTO } from './project_app_type.dto';

@Injectable()
export class ProjectAppTypeService {
    constructor(
        @InjectRepository(ProjectsAppType)
        private projectAppTypeRepo: Repository<ProjectsAppType>
    ){}
    async listing(): Promise<any>{
        try{
            return await this.projectAppTypeRepo.find();
        }catch(err){
            throw new NotFoundException(err);
        }
    }
    async create(body: CreateProjectAppTypeDTO): Promise<any>{
        try{
            const data = await this.projectAppTypeRepo.save(body);
            return {
                success: true,
                message: 'Data have been created successfully!',
                data: data
            }
        }catch(err){
            throw new BadRequestException(err);
        }
    }
    async update(id: number , body: UpdateProjectAppTypeDTO): Promise<any>{
        const isExist = await this.projectAppTypeRepo.findOneBy({id: id});
        if(!isExist){
            throw new NotFoundException('Invalid Project App Type ID!');
        }
        try{
            await this.projectAppTypeRepo.update(
                {
                    id: id
                },
                {
                    name: body.name,
                    color: body.color
                }
            );
            const data = await this.projectAppTypeRepo.findOneBy({id: id});
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
        const isExist = await this.projectAppTypeRepo.findOneBy({id: id});
        if(!isExist){
            throw new NotFoundException('Invalid Project App Type ID!');
        }
        try{
            await this.projectAppTypeRepo.delete(id);
            return {
                success: true,
                message: 'Data have been deleted successfully!'
            }
        }catch(err){
            throw new BadRequestException(err);
        }
    }
}
