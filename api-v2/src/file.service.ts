/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class FileService {
    async callFileService(formData: FormData): Promise<any> {
        const fileServiceUrl = process.env.FILE_SERVICE_URL;
        try {
            const response = await axios.post(fileServiceUrl, formData,{
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `authorization ${process.env.FILE_SECRET}`
                }
            });
            return response.data;
        } catch (error) {
            console.log(error)
            
            throw new BadRequestException('Failed to call File service');
        }
    }
}
