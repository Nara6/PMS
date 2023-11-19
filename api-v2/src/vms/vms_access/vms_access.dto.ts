/* eslint-disable prettier/prettier */
import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";

export class CreateVMAccessDTO{
    @ApiProperty()
    @IsNotEmpty()
    @IsPositive()
    @IsNumber()
    type_id: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsPositive()
    @IsNumber()
    from_vm_id: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsPositive()
    @IsNumber()
    to_vm_id: number;

    @ApiProperty()
    @IsBoolean()
    @IsNotEmpty()
    is_two_way: boolean;

    @ApiProperty()
    @IsOptional()
    @IsString()
    from_vpn_acc_id: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    vpn_user_id: string;
    
}
export class UpdateVMAccessDTO extends CreateVMAccessDTO{}