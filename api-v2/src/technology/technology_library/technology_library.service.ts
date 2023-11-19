/* eslint-disable prettier/prettier */
import { BadRequestException, Catch, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TechLibraries } from 'src/entity/technology/tech_libraries.entity';
import { Repository } from 'typeorm';
import { techLirariesCreateDTO, techLirariesUdpateDTO } from './technology_library.dto';
import { Tech } from 'src/entity/technology/tech.entity';
import { TechLibsType } from 'src/entity/technology/tech_libs_type.entity';

@Injectable()
export class TechnologyLibraryService {
    constructor(
        @InjectRepository(TechLibraries)
        private techLibRepo : Repository<TechLibraries>,
        @InjectRepository(Tech)
        private techRepo : Repository<Tech>,
        @InjectRepository(TechLibsType)
        private techLibTypeRepo : Repository<Tech>,
        
    ){}
    async listing(): Promise<any>{
        const techLib = await this.techLibRepo.find(
            {
                relations:{
                    tech: true,
                    type: true
                },
                select: {
                    tech: {
                        id: true,
                        name: true,
                        language: true,
                        icon: true,
                        description: true,
                    },
                    type: {
                        id: true,
                        name: true,
                        language: true,
                        icon: true,
                    }
                }
            }
        )
        return {
            success: true,
            data: techLib
        }
    }
    
    async create(body: techLirariesCreateDTO): Promise<any>{
        const isTechExist   =   await this.techRepo.findOneBy({id: body.tech_id});
        if(!isTechExist){
            throw new NotFoundException('tech_id provided does not exist!');
        }
        const isTechLibTypeExist   =   await this.techLibTypeRepo.findOneBy({id: body.type_id});
        if(!isTechLibTypeExist){
            throw new NotFoundException('type_id provided does not exist!');
        }
        const TechLibraries = await this.techLibRepo.save(body);
        return {
            success: true,
            message: 'Data have been created successfully!',
            data: TechLibraries
        }
    }
    async update(id: number , body: techLirariesUdpateDTO): Promise<any>{
        const isExist = await this.techLibRepo.findOneBy({id: id});
        if(!isExist){
            throw new NotFoundException('ID provided does not exist!');
        }
        const isTechExist   =   await this.techRepo.findOneBy({id: body.tech_id});
        if(!isTechExist){
            throw new NotFoundException('tech_id provided does not exist!');
        }
        const isTechLibTypeExist   =   await this.techLibTypeRepo.findOneBy({id: body.type_id});
        if(!isTechLibTypeExist){
            throw new NotFoundException('type_id provided does not exist!');
        }
        try{
            await this.techLibRepo.update(id,
                {
                    tech: isTechExist,
                    type: isTechLibTypeExist,
                    name: body.name,
                    icon: body.icon
                }
            );
            const TechLibraries = await this.techLibRepo.findOneBy({id: id});
            return {
                success: true,
                message: 'Data have been updated successfully!',
                data: TechLibraries
            }
        }catch(err){
            throw new BadRequestException(err);
        }
        
        
    }
    async delete(id: number): Promise<any>{
        const isExist = await this.techLibRepo.findOneBy({id: id});
        if(!isExist){
            throw new NotFoundException('ID provided does not exist!');
        }
        await this.techLibRepo.delete(id);
        return {
            success: true,
            message: 'Data have been deleted successfully!'
        }
    }
    async dataSetup(): Promise<any>{
        try{
            const tech      =      await this.techRepo.find(
                {
                    select: {
                        id: true,
                        name: true
                    }
                }
            );
            const techLibType      =     await  this.techLibTypeRepo.find(
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
                    tech: tech,
                    type: techLibType
                }
            }
        }catch(err){
            throw new BadRequestException(err);
        }
    }

}
