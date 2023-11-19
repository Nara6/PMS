/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectsType } from 'src/entity/project/projects_type.entity';
import { Repository } from 'typeorm';
import { CreateProjectTypeDTO, UpdateProjectTypeDTO } from './project_type.dto';

@Injectable()
export class ProjectTypeService {
    constructor(
        @InjectRepository(ProjectsType)
        private readonly projectTypeRepository: Repository<ProjectsType>
    ){}
    
    async listing(): Promise<any>{
        try{
            return await this.projectTypeRepository.find();
        }catch(err){
            throw new NotFoundException(err);
        }
    }
    async create(body: CreateProjectTypeDTO): Promise<any>{
        try{
            const data = await this.projectTypeRepository.save(body);
            return {
                success: true,
                message: 'Data have been created successfully!',
                data: data
            }
        }catch(err){
            throw new BadRequestException(err);
        }
    }
    async update(id: number, body: UpdateProjectTypeDTO): Promise<any>{
        const isExist = await this.projectTypeRepository.findOneBy({id: id});
        if(!isExist){
            throw new NotFoundException('Invalid Project Type ID!');
        }
        try{
            await this.projectTypeRepository.update(
                {
                    id: id
                },
                {
                    name: body.name
                }
            );
            const data = await this.projectTypeRepository.findOneBy({id: id});
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
        const isExist = await this.projectTypeRepository.findOneBy({id: id});
        if (!isExist) {
            throw new NotFoundException('Invalid Project Type ID!')
        }
        try{
            await this.projectTypeRepository.delete(id);
            return {
                success: true,
                message: 'Data have been deleted successfully!'
            }
        }catch(err){
            throw new BadRequestException(err);
        }
    }
}
