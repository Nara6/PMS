/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Projects } from 'src/entity/project/projects.entity';
import { ProjectsTimeLine } from 'src/entity/project/projects_timeline.entity';
import { Repository } from 'typeorm';
import { CreateProjectTimeLineDTO, UpdateProjectTimeLineDTO } from './project_timeline.dto';
import { ProjectsTimeLineStat } from 'src/entity/project/projects_timeline_status.entity';

@Injectable()
export class ProjectTimelineService {
    constructor(
        @InjectRepository(ProjectsTimeLine)
        private projectTimelineRepository: Repository<ProjectsTimeLine>,
        @InjectRepository(Projects)
        private projectRepository: Repository<Projects>,
        @InjectRepository(ProjectsTimeLineStat)
        private projectTimelineStatRepository: Repository<ProjectsTimeLineStat>,
    ){}
    async listing(): Promise<any>{
        try{
            const data = await this.projectTimelineRepository.find(
                {
                    relations: {
                        Projects: {
                            ProjectsType: true,
                            ProjectsStatus: true,
                        },
                        ProjectsTimeLineStat:   true,
                    },
                    select: {
                        task: true,
                        from: true,
                        to: true,
                        Projects: {
                            id: true,
                            kh_name: true,
                            en_name: true,
                            abbre: true,
                            icon: true,
                            ProjectsType: {
                                id: true,
                                name: true,
                            },
                            ProjectsStatus: {
                                id: true,
                                name: true,
                                color: true,
                            },
        
                        },
                        ProjectsTimeLineStat: {
                            id: true,
                            name: true,
                            color: true,
                        }, 
                    }
                }

            )
            return data;
        }catch(err){
            throw new NotFoundException(err);
        }
    }
    async create(body: CreateProjectTimeLineDTO): Promise<any>{
        const isProjectExist = await this.projectRepository.findOneBy({id: body.project_id});
        if(!isProjectExist){
            throw new NotFoundException('Invalid Project ID!');
        }
        const isStatusExist = await this.projectTimelineStatRepository.findOneBy({id: body.status_id});
        if(!isStatusExist){
            throw new NotFoundException('Invalid Status ID!');
        }
        if(body.to < body.from){
            throw new BadRequestException('To Date cannot smaller than From Date!');
        }
        try{
            const toSave = await this.projectTimelineRepository.save(
                {
                    Projects: isProjectExist,
                    ProjectsTimeLineStat: isStatusExist,
                    task: body.task,
                    from: body.from,
                    to: body.to,
                }
            )
            const data  = await this.projectTimelineRepository.find(
                {
                    where:{
                        id: toSave.id
                    },
                    relations:{
                        ProjectsTimeLineStat: true,
                        Projects: true,
                    },
                    select: {
                        ProjectsTimeLineStat: {
                            id: true,
                        },
                        Projects: {
                            id: true,
                        },
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
    async update(id: number, body: UpdateProjectTimeLineDTO){
        const isExist = await this.projectTimelineRepository.findOneBy({id: id});
        if(!isExist){
            throw new NotFoundException('Invalid Project Timeline ID!');
        }
        const isProjectExist = await this.projectRepository.findOneBy({id: body.project_id});
        if(!isProjectExist){
            throw new NotFoundException('Invalid Project ID!');
        }
        const isStatusExist = await this.projectTimelineStatRepository.findOneBy({id: body.status_id});
        if(!isStatusExist){
            throw new NotFoundException('Invalid Status ID!');
        }
        if(body.to < body.from){
            throw new BadRequestException('To Date cannot smaller than From Date!');
        }

        try{
            await this.projectTimelineRepository.update(
                {
                    id: id
                },
                {
                    Projects: isProjectExist,
                    ProjectsTimeLineStat: isStatusExist,
                    task: body.task,
                    from: body.from,
                    to: body.to,
                }
            )
            const data  = await this.projectTimelineRepository.find(
                {
                    where:{
                        id: id
                    },
                    relations:{
                        ProjectsTimeLineStat: true,
                        Projects: true,
                    },
                    select: {
                        ProjectsTimeLineStat: {
                            id: true,
                        },
                        Projects: {
                            id: true,
                        },
                    }
                }
            )
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
        const isExist = await this.projectTimelineRepository.findOneBy({id: id});
        if(!isExist){
            throw new NotFoundException('Invalid Project Timeline ID!');
        }
        try{
            await this.projectTimelineRepository.delete(id);
            return {
                success: true,
                message: 'Data have been deleted successfully!'
            }
        }catch(err){
            throw new BadRequestException(err);
        }
    }
    async listById(id: number): Promise<any>{
        const isExist = await this.projectTimelineRepository.findOneBy({id: id});
        if(!isExist){
            throw new NotFoundException('Invalid Project Timeline ID!');
        }
        try{
            return this.projectTimelineRepository.find(
                {
                    where: {
                        id: id
                    },
                    relations: {
                        Projects: {
                            ProjectsType: true,
                            ProjectsStatus: true,
                        },
                        ProjectsTimeLineStat:   true,
                    },
                    select: {
                        task: true,
                        from: true,
                        to: true,
                        Projects: {
                            id: true,
                            kh_name: true,
                            en_name: true,
                            abbre: true,
                            icon: true,
                            ProjectsType: {
                                id: true,
                                name: true,
                            },
                            ProjectsStatus: {
                                id: true,
                                name: true,
                                color: true,
                            },
        
                        },
                        ProjectsTimeLineStat: {
                            id: true,
                            name: true,
                            color: true,
                        }, 
                    }
                }
            );
        }catch(err){
            throw new NotFoundException(err);
        }
    }
    async data_setup(): Promise<any>{
        try{
            const project       =   await this.projectRepository.find(
                {
                    select: {
                        id: true,
                        kh_name: true,
                        en_name: true
                    }
                }
            );
            const projectTimelineStat              =   await this.projectTimelineStatRepository.find(
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
                    Projects: project,
                    ProjectTimelineStatus: projectTimelineStat,
                }
            }
        }catch(err){
            throw new BadRequestException(err);
        }
    }
}
