/* eslint-disable prettier/prettier */
import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";

export class CreateProjectTaskDTO{
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    project_id: number;
    
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    status_id: number;

    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    description: string;

    @ApiProperty()
    @IsDateString()
    @IsOptional()
    due_date: Date;
}
export class UpdateProjectTaskDTO extends CreateProjectTaskDTO{}