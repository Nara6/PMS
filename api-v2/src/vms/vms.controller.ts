/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post, Query, Put, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { VMs } from 'src/entity/vm/vms.entity';
import { PageDto, PageOptionDTO } from 'src/utils/pagination/pagination.dto';
import { CreateVMDTO, UpdateVMDTO } from './vms.dto';
import { VmsService } from './vms.service';

@ApiTags('vms')
@Controller('api/vms')
export class VmsController {
    constructor(
        private vmsService: VmsService,
    ){}
    // ============>> Liststing Controller
    @Get()
    async listing(@Query() pageOptionDTO: PageOptionDTO):Promise<PageDto<VMs>>{
        return await this.vmsService.findAllVm(pageOptionDTO);
    }
    // ============>> List By Id Controller
    @Get(':id')
    async listById(@Param('id') id: number):Promise<any>{
        return await this.vmsService.listById(id);
    }
    // ============>> Create Controller
    @Post('create')
    async create(@Body() body: CreateVMDTO): Promise<any>{
        return this.vmsService.create(body);
    }
    // ============>> update Controller
    @Put('update/:id')
    async update(@Param('id') id:number,@Body() body: UpdateVMDTO): Promise<any>{
        return await this.vmsService.update(id,body);
    }
    // ============>> delete Controller
    @Delete('delete/:id')
    async delete(@Param('id') id: number): Promise<any>{
        return await this.vmsService.delete(id);
    }

    // ============>> data-setup Controller
    @Get('data-setup/listing')
    async dataSetup(): Promise<any> {
        return await this.vmsService.listDataSetup();
    }

}
