/* eslint-disable prettier/prettier */
import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateProjectAppTypeDTO{
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    color: string;
}
export class UpdateProjectAppTypeDTO extends CreateProjectAppTypeDTO{}