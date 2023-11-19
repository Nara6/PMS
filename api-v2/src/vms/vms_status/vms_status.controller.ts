/* eslint-disable prettier/prettier */
import { Body, Controller, Param, Get, Post, Put, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { VmsStatusService } from './vms_status.service';
import { CreateVMStatusDTO, UpdateVMStatusDTO } from './vms_status.dto';


@ApiTags('VMs-Status')
@Controller('api/vms-status')
export class VmsStatusController {
    constructor(
        private vmsStatus: VmsStatusService,
    ){}
    // ============>> Liststing Controller
    @Get()
    async listing():Promise<any>{
        return await this.vmsStatus.listing();
    }
    // ============>> Create Controller
    @Post('create')
    async create(@Body() body: CreateVMStatusDTO): Promise<any>{
        return this.vmsStatus.create(body);
    }
    // ============>> update Controller
    @Put('update/:id')
    async update(@Param('id') id:number,@Body() body: UpdateVMStatusDTO): Promise<any>{
        return await this.vmsStatus.update(id,body);
    }
    // ============>> delete Controller
    @Delete('delete/:id')
    async delete(@Param('id') id: number): Promise<any>{
        return await this.vmsStatus.delete(id);
    }
}
