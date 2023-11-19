/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post,Put, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { VmsTagService } from './vms_tag.service';
import { CreateVMTagDTO, UpdateVMTagDTO } from './vms_tag.dto';

@ApiTags('VMs-tag')
@Controller('api/vms-tag')
export class VmsTagController {
    constructor(
        private vmsTag: VmsTagService,
    ){}
    // ============>> Liststing Controller
    @Get()
    async listing():Promise<any>{
        return await this.vmsTag.listing();
    }
    // ============>> Create Controller
    @Post('create')
    async create(@Body() body: CreateVMTagDTO): Promise<any>{
        return this.vmsTag.create(body);
    }
    // ============>> update Controller
    @Put('update/:id')
    async update(@Param('id') id:number,@Body() body: UpdateVMTagDTO): Promise<any>{
        return await this.vmsTag.update(id,body);
    }
    // ============>> delete Controller
    @Delete('delete/:id')
    async delete(@Param('id') id: number): Promise<any>{
        return await this.vmsTag.delete(id);
    }
}
