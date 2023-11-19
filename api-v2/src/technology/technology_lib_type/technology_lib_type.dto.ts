/* eslint-disable prettier/prettier */
import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class TechLibTypeCreateDTO{
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
}
export class TechLibTypeUpdateDTO extends TechLibTypeCreateDTO{}