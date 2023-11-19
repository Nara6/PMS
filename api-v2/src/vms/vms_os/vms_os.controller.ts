/* eslint-disable prettier/prettier */
import { Body, Controller, Param, Get, Post, Put,Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateVMOsDTO, UpdateVMOsDTO } from './vms_os.dto';
import { VmsOsService } from './vms_os.service';


@ApiTags('VMs-Os')
@Controller('api/vms-os')
export class VmsOsController {
    constructor(
        private vmsOs: VmsOsService,
    ){}
    // ============>> Liststing Controller
    @Get()
    async listing():Promise<any>{
        return await this.vmsOs.listing();
    }
    // ============>> Create Controller
    @Post('create')
    async create(@Body() body: CreateVMOsDTO): Promise<any>{
        return this.vmsOs.create(body);
    }
    // ============>> update Controller
    @Put('update/:id')
    async update(@Param('id') id:number,@Body() body: UpdateVMOsDTO): Promise<any>{
        return await this.vmsOs.update(id,body);
    }
    // ============>> delete Controller
    @Delete('delete/:id')
    async delete(@Param('id') id: number): Promise<any>{
        return await this.vmsOs.delete(id);
    }
}
