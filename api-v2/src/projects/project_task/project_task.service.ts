/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectsTask } from 'src/entity/project/projects_task.entity';
import { Repository } from 'typeorm';
import { CreateProjectTaskDTO, UpdateProjectTaskDTO } from './project_task.dto';
import { Projects } from 'src/entity/project/projects.entity';
import { ProjectsTaskStatus } from 'src/entity/project/projects_task_status.entity';

@Injectable()
export class ProjectTaskService {
    constructor(
        @InjectRepository(ProjectsTask)
        private readonly ProjectTaskRepo: Repository<ProjectsTask>,
        @InjectRepository(Projects)
        private readonly ProjectRepo: Repository<Projects>,
        @InjectRepository(ProjectsTaskStatus)
        private readonly ProjectTaskStatusRepo: Repository<ProjectsTaskStatus>,
    ){}
    async listing(): Promise<any>{
        try{
            return await this.ProjectTaskRepo.find(
                {
                    relations:{
                        ProjectsTaskStatus: true,
                        Users: true
                    },
                    select:{
                        ProjectsTaskStatus:{
                            name: true,
                            color: true,
                        },
                        Users: {
                            avatar: true,
                            en_name: true,
                            kh_name: true
                        }
                    }
                }
            );
        }catch(err){
            throw new NotFoundException(err);
        }
    }
    async create(body: CreateProjectTaskDTO): Promise<any>{
        const isProjectExist = await this.ProjectRepo.findOneBy({id: body.project_id});
        if(!isProjectExist){
            throw new NotFoundException('Invalid Project ID!');
        }
        const isStatusExist = await this.ProjectTaskStatusRepo.findOneBy({id: body.status_id});
        if(!isStatusExist){
            throw new NotFoundException('Invalid Project Task Status ID!');
        }
        try{
            const toSave = await this.ProjectTaskRepo.save(
                {
                    Projects: isProjectExist,
                    ProjectsTaskStatus: isStatusExist,
                    name: body.name,
                    description: body.description,
                    due_date: body.due_date
                }
            );
            const data = await this.ProjectTaskRepo.find(
                {
                    where: {
                        id: toSave.id
                    },
                    relations:{
                        Projects: true,
                        ProjectsTaskStatus: true,
                    },
                    select:{
                        Projects: {
                            id: true,
                            en_name: true,
                            kh_name: true,
                        },
                        ProjectsTaskStatus: {
                            id: true,
                            name: true
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
    async update(id: number , body: UpdateProjectTaskDTO): Promise<any>{
        const isExist = await this.ProjectTaskRepo.findOneBy({id: id});
        if(!isExist){
            throw new NotFoundException('Invalid Project Task ID!');
        }
        const isProjectExist = await this.ProjectRepo.findOneBy({id: body.project_id});
        if(!isProjectExist){
            throw new NotFoundException('Invalid Project ID!');
        }
        const isStatusExist = await this.ProjectTaskStatusRepo.findOneBy({id: body.status_id});
        if(!isStatusExist){
            throw new NotFoundException('Invalid Project Task Status ID!');
        }
        try{
            await this.ProjectTaskRepo.update(
                {
                    id: id
                },
                {
                    Projects: isProjectExist,
                    ProjectsTaskStatus: isStatusExist,
                    name: body.name,
                    description: body.description,
                    due_date: body.due_date
                }
            );
            const data = await this.ProjectTaskRepo.find(
                {
                    where: {
                        id: id
                    },
                    relations:{
                        Projects: true,
                        ProjectsTaskStatus: true,
                    },
                    select:{
                        Projects: {
                            id: true,
                            en_name: true,
                            kh_name: true,
                        },
                        ProjectsTaskStatus: {
                            id: true,
                            name: true
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
        const isExist = await this.ProjectTaskRepo.findOneBy({id: id});
        if(!isExist){
            throw new NotFoundException('Invalid Project Task ID!');
        }
        try{
            await this.ProjectTaskRepo.delete(id);
            return {
                success: true,
                message: 'Data have been deleted successfully!'
            }
        }catch(err){
            throw new BadRequestException(err);
        }
    }
}
