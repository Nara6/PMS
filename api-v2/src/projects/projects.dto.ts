/* eslint-disable prettier/prettier */
import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsDateString, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";

export class CreateProjectDTO{
    @ApiProperty()
    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    type_id: number;

    @ApiProperty()
    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    status_id: number;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    kh_name: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    en_name: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    abbre: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    icon: string;

    @ApiProperty()
    @IsDateString()
    start_date: Date;

    @ApiProperty()
    @IsDateString()
    due_date: Date;

}

export class UpdateProjectDTO extends CreateProjectDTO{}