/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectsTimeLineStat } from 'src/entity/project/projects_timeline_status.entity';
import { Repository } from 'typeorm';
import { CreateProjectTimeLineStatusDTO, UpdateProjectTimeLineStatusDTO } from './project_timeline_status.dto';

@Injectable()
export class ProjectTimelineStatusService {
    constructor(
        @InjectRepository(ProjectsTimeLineStat)
        private projectStatusRepository: Repository<ProjectsTimeLineStat>
    ){}
    async listing(): Promise<any>{
        try{
            return await this.projectStatusRepository.find();
        }catch(err){
            throw new NotFoundException(err);
        }
    }
    async create(body: CreateProjectTimeLineStatusDTO): Promise<any>{
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
    async update(id: number , body: UpdateProjectTimeLineStatusDTO): Promise<any>{
        const isExist = await this.projectStatusRepository.findOneBy({id: id});
        if(!isExist){
            throw new NotFoundException('Invalid Project Timeline Status ID!');
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
            throw new NotFoundException('Invalid Project Timeline Status ID!');
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
