/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectsStatus } from 'src/entity/project/projects_status.entity';
import { Repository } from 'typeorm';
import { CreateProjectStatusDTO, UpdateProjectStatusDTO } from './project_status.dto';

@Injectable()
export class ProjectStatusService {
    constructor(
        @InjectRepository(ProjectsStatus)
        private projectStatusRepository: Repository<ProjectsStatus>
    ){}
    async listing(): Promise<any>{
        try{
            return await this.projectStatusRepository.find();
        }catch(err){
            throw new NotFoundException(err);
        }
    }
    async create(body: CreateProjectStatusDTO): Promise<any>{
        try{
            const data = await this.projectStatusRepository.save(body);
            return {
                success: true,
                message: 'Data have been created successfully!',
                data: data
            }
        }catch(err){
            throw new BadRequestException(err);
        }
    }
    async update(id: number , body: UpdateProjectStatusDTO): Promise<any>{
        const isExist = await this.projectStatusRepository.findOneBy({id: id});
        if(!isExist){
            throw new NotFoundException('Invalid Project Status ID!');
        }
        try{
            await this.projectStatusRepository.update(
                {
                    id: id
                },
                {
                    name: body.name,
                    color: body.color
                }
            );
            const data = await this.projectStatusRepository.findOneBy({id: id});
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
        const isExist = await this.projectStatusRepository.findOneBy({id: id});
        if(!isExist){
            throw new NotFoundException('Invalid Project Status ID!');
        }
        try{
            await this.projectStatusRepository.delete(id);
            return {
                success: true,
                message: 'Data have been deleted successfully!'
            }
        }catch(err){
            throw new BadRequestException(err);
        }
    }
}

