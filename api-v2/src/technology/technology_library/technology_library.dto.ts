/* eslint-disable prettier/prettier */
import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator";

export class techLirariesCreateDTO{
    @ApiProperty()
    @IsPositive()
    @IsNumber()
    @IsNotEmpty()
    tech_id: number

    @ApiProperty()
    @IsPositive()
    @IsNumber()
    @IsNotEmpty()
    type_id: number

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    icon: string

}
export class techLirariesUdpateDTO extends techLirariesCreateDTO{}