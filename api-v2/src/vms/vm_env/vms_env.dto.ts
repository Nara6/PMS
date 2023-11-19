/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateVMEnvDTO{
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;
    
    
}
export class UpdateVMEnvDTO extends CreateVMEnvDTO{}