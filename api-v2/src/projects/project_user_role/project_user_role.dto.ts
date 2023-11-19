/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateProjectUserRoleDTO{
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    abbre: string;
}
export class UpdateProjectUserRoleDTO extends CreateProjectUserRoleDTO{}