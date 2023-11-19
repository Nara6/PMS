/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectsTaskStatus } from 'src/entity/project/projects_task_status.entity';
import { Repository } from 'typeorm';
import { CreateProjectTaskStatusDTO, UpdateProjectTaskStatusDTO } from './project_task_status.dto';

@Injectable()
export class ProjectTaskStatusService {
    constructor(
        @InjectRepository(ProjectsTaskStatus)
        private readonly ProjectTaskStatusRepo: Repository<ProjectsTaskStatus>
    ){}
    async listing(): Promise<any>{
        try{
            return await this.ProjectTaskStatusRepo.find(
                {
                    relations: {
                        Task: {
                            Users: true
                        },
                        
                    },
                    select:{
                        Task:{
                            id: true,
                            name: true,
                            due_date: true,
                            description: true,
                            created_at: true,
                            Users:{
                                id:true,
                                en_name: true,
                                kh_name: true,
                                avatar: true,
                            }
                        },
                        
                        
                    }
                    
                }
            );
        }catch(err){
            throw new NotFoundException(err);
        }
    }
    async create(body: CreateProjectTaskStatusDTO): Promise<any>{
        try{
            const data = await this.ProjectTaskStatusRepo.save(body);
            return {
                success: true,
                message: 'Data have been created successfully!',
                data: data
            }
        }catch(err){
            throw new BadRequestException(err);
        }
    }
    async update(id: number , body: UpdateProjectTaskStatusDTO): Promise<any>{
        const isExist = await this.ProjectTaskStatusRepo.findOneBy({id: id});
        if(!isExist){
            throw new NotFoundException('Invalid Project Task Status ID!');
        }
        try{
            await this.ProjectTaskStatusRepo.update(
                {
                    id: id
                },
                {
                    name: body.name,
                    color: body.color
                }
            );
            const data = await this.ProjectTaskStatusRepo.findOneBy({id: id});
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
        const isExist = await this.ProjectTaskStatusRepo.findOneBy({id: id});
        if(!isExist){
            throw new NotFoundException('Invalid Project Task Status ID!');
        }
        try{
            await this.ProjectTaskStatusRepo.delete(id);
            return {
                success: true,
                message: 'Data have been deleted successfully!'
            }
        }catch(err){
            throw new BadRequestException(err);
        }
    }
}
