/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tech } from 'src/entity/technology/tech.entity';
import { Repository } from 'typeorm';
import { CreateTechDTO, updateTechDTO } from './technology.dto';
import { FileService } from 'src/file.service';
import { fileHandler } from 'src/utils/base64/Handler';

@Injectable()
export class TechnologyService {
    constructor(
        @InjectRepository(Tech)
        private readonly technologyRepository: Repository<Tech>
    ){}
    async listing(): Promise<any>{
        try{
            const tech  = await this.technologyRepository.find();
            return{
                success: true,
                data: tech
            }
        }catch(err){
            throw new NotFoundException(err);
        }
    }

    async create(body: CreateTechDTO, file? : Express.Multer.File): Promise<any>{
        let fileUpload = null;

        if(body.icon){
            fileUpload = await fileHandler(body.icon);
        }
        try{
            const tech = await this.technologyRepository.save(
                {
                    name: body.name,
                    language: body.language,
                    description: body.description,
                    icon: fileUpload? fileUpload.data.uri : null
                }
            );
            return {
                success: true,
                message: 'Technology have been created successfully!',
                data: tech
            }
        }
        catch(err){
            throw new NotFoundException(err);
        }
    }

    async update(id: number, body: updateTechDTO): Promise<any>{
        let fileUpload = null;

        if(body.icon){
            fileUpload = await fileHandler(body.icon);
        }
        try{
            const isExist = await this.technologyRepository.findOneBy({ id: id });
            // check if provided id exist?
            if(!isExist){
                throw new NotFoundException('Technology id provided not exist');
            }
            // If exist
            await this.technologyRepository.update(
                {
                    id: id
                },
                {
                    name: body.name,
                    language: body.language,
                    description: body.description,
                    icon: fileUpload? fileUpload.data.uri : null
                }
            );
            const technology = await this.technologyRepository.findOneBy({id: id});
            return {
                success: true,
                message: 'Data have been updated successfully!',
                data: technology
            }
        }catch(err){
            throw new BadRequestException(err);
        }
        

    }
    
    async delete(id: number){
        
        const isExist = await this.technologyRepository.findOneBy({id: id});
        if(!isExist){
            throw new NotFoundException('Data Not Found');
        }
        await this.technologyRepository.delete(id);
        return {
            success: true,
            message: 'Data have been deleted successfully!'
        }
    
    }

}
