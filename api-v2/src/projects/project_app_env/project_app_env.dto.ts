/* eslint-disable prettier/prettier */
import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, MaxLength } from "class-validator";

export class createProjectAppEnvDTO{
    @ApiProperty()
    @IsNotEmpty()
    @IsPositive()
    @IsNumber()
    app_id: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsPositive()
    @IsNumber()
    env_id: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsPositive()
    @IsNumber()
    vm_id: number;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    url: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @MaxLength(10)
    port: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    note: string;


}
export class updateProjectAppEnvDTO extends createProjectAppEnvDTO{}