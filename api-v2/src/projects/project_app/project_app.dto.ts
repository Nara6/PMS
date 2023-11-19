/* eslint-disable prettier/prettier */
import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";

export class CreateProjectAppDTO{
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    type_id: number;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    project_id: number;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    tech_id: number;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    tech_version: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    description: string;
}
export class UpdateProjectAppDTO extends CreateProjectAppDTO{}