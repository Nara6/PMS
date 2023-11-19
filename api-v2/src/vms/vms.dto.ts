/* eslint-disable prettier/prettier */
import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsPositive, IsString} from "class-validator";

export class CreateVMDTO{
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    env_id: number;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    os_id: number;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    tag_id: number;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    status_id: number;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    private_ip: string;

    @ApiProperty()
    @IsString()
    public_ip: string;

    @ApiProperty()
    @IsNumber()
    @IsPositive()
    ram: number;

    @ApiProperty()
    @IsPositive()
    @IsNumber()
    hdd: number;

    @ApiProperty()
    @IsString()
    core: string;

    @ApiProperty()
    @IsString()
    os_version: string;
    
    @ApiProperty()
    @IsString()
    note: string;
}
export class UpdateVMDTO extends CreateVMDTO{}