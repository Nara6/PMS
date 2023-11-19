/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TechLibsType } from 'src/entity/technology/tech_libs_type.entity';
import { Repository } from 'typeorm';
import { TechLibTypeCreateDTO, TechLibTypeUpdateDTO } from './technology_lib_type.dto';
import { fileHandler } from 'src/utils/base64/Handler';

@Injectable()
export class TechnologyLibTypeService {
    constructor(
        @InjectRepository(TechLibsType)
        private readonly techLibTypeRepository: Repository<TechLibsType>
    ) { }
    async listing(): Promise<any> {
        try {
            const techLib = await this.techLibTypeRepository.find();
            return {
                success: true,
                data: techLib
            }
        } catch (err) {
            throw new NotFoundException(err);
        }
    }

    async create(body: TechLibTypeCreateDTO): Promise<any> {
        let fileUpload = null;

        if (body.icon) {
            fileUpload = await fileHandler(body.icon);
        }
        try {
            const techLibType = await this.techLibTypeRepository.save(

                {
                    name: body.name,
                    language: body.language,
                    icon: fileUpload ? fileUpload.data.uri : null
                }

            );
            return {
                success: true,
                message: 'Data have been created successfully!',
                data: techLibType
            }
        } catch (err) {
            throw new BadRequestException(err);
        }
    }

    async update(id: number, body: TechLibTypeUpdateDTO): Promise<any> {
        const isExist = await this.techLibTypeRepository.findOneBy({ id: id });
        let fileUpload = null;

        if (body.icon) {
            fileUpload = await fileHandler(body.icon);
        }
        if (!isExist) {
            throw new NotFoundException('Id provided does not exist!');
        }
        await this.techLibTypeRepository.update(
            {
                id: id
            },
            {
                name: body.name,
                language: body.language,
                icon: fileUpload? fileUpload.data.uri : null
            }
        );
        const techLibType = await this.techLibTypeRepository.findOneBy({ id: id });
        return {
            success: true,
            message: 'Data have been updated successfully!',
            data: techLibType
        }
    }

    async delete(id: number): Promise<any> {
        const isExist = await this.techLibTypeRepository.findOneBy({ id: id });
        if (!isExist) {
            throw new NotFoundException('Id provided does not exist!');
        }
        await this.techLibTypeRepository.delete(id);
        return {
            success: true,
            message: 'Data have been deleted successfully!'
        }
    }
}
