/* eslint-disable prettier/prettier */
import { Controller, Get, Query, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { VmsAccessService } from './vms_access.service';
import { PageDto, PageOptionDTO } from 'src/utils/pagination/pagination.dto';
import { VMsAccess } from 'src/entity/vm/vms_access.entity';
import { CreateVMAccessDTO, UpdateVMAccessDTO } from './vms_access.dto';

@ApiTags('VMs-acess')
@Controller('api/vms-access')
export class VmsAccessController {
    constructor(
        private vmsAcessService: VmsAccessService,
    ){}
    // ============>> Liststing Controller
    @Get()
    async listing(@Query() pageOptionDTO: PageOptionDTO):Promise<PageDto<VMsAccess>>{
        return await this.vmsAcessService.listing(pageOptionDTO);
    }
    // ============>> List By Id Controller
    @Get(':id')
    async listById(@Param('id') id: number):Promise<any>{
        return await this.vmsAcessService.listById(id);
    }
    // ============>> Create Controller
    @Post('create')
    async create(@Body() body: CreateVMAccessDTO): Promise<any>{
        return this.vmsAcessService.create(body);
    }
    // ============>> update Controller
    @Put('update/:id')
    async update(@Param('id') id:number,@Body() body: UpdateVMAccessDTO): Promise<any>{
        return await this.vmsAcessService.update(id,body);
    }
    // ============>> delete Controller
    @Delete('delete/:id')
    async delete(@Param('id') id: number): Promise<any>{
        return await this.vmsAcessService.delete(id);
    }
}
