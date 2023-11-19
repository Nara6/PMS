/* eslint-disable prettier/prettier */
import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsNotEmpty, IsPositive, IsString } from "class-validator";

export class CreateUsersLogDTO{
    @ApiProperty()
    @IsPositive()
    @IsNotEmpty()
    user_id: number;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    ip: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    os: string;
    
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    agent: string;
    
}
export class UpdateUsersLogDTO extends CreateUsersLogDTO{}