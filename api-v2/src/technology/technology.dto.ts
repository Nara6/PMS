/* eslint-disable prettier/prettier */
import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateTechDTO{
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    language: string;

    @ApiProperty()
    @IsString()
    icon: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    description: string;

}

export class updateTechDTO extends CreateTechDTO{}