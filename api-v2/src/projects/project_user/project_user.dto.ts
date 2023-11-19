/* eslint-disable prettier/prettier */
import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsPositive } from "class-validator";

export class CreateProjectUserDTO{
    @ApiProperty()
    @IsPositive()
    @IsNotEmpty()
    @IsNumber()
    project_id: number; 

    @ApiProperty()
    @IsPositive()
    @IsNotEmpty()
    @IsNumber()
    user_id: number;

    @ApiProperty()
    @IsPositive()
    @IsNotEmpty()
    @IsNumber()
    role_id: number; 
}
export class UpdateProjectUserDTO extends CreateProjectUserDTO{}