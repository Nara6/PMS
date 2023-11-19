/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateVMOsDTO{
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;
    
    @ApiProperty()
    @IsString()
    @IsOptional()
    icon: string;
    
}
export class UpdateVMOsDTO extends CreateVMOsDTO{}