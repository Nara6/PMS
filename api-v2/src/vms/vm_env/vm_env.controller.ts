/* eslint-disable prettier/prettier */
import { Body, Controller, Param, Get, Post, Put, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { VmEnvService } from './vm_env.service';
import { VMsEnv } from 'src/entity/vm/vms_env.entity';
import { CreateVMEnvDTO, UpdateVMEnvDTO } from './vms_env.dto';


@ApiTags('VMs-Env')
@Controller('api/vm-env')
export class VmEnvController {
    constructor(
        private vmsEnv: VmEnvService,
    ){}
    // ============>> Liststing Controller
    @Get()
    async listing():Promise<any>{
        return await this.vmsEnv.listing();
    }
    // ============>> Create Controller
    @Post('create')
    async create(@Body() body: CreateVMEnvDTO): Promise<any>{
        return this.vmsEnv.create(body);
    }
    // ============>> update Controller
    @Put('update/:id')
    async update(@Param('id') id:number,@Body() body: UpdateVMEnvDTO): Promise<any>{
        return await this.vmsEnv.update(id,body);
    }
    // ============>> delete Controller
    @Delete('delete/:id')
    async delete(@Param('id') id: number): Promise<any>{
        return await this.vmsEnv.delete(id);
    }
}
