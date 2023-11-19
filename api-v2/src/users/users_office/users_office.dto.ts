/* eslint-disable prettier/prettier */
import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsNumber, IsPositive, IsString, MaxLength } from "class-validator";

export class createUsersOfficeDTO{
    // @ApiProperty()
    // @IsPositive()
    // @IsNumber()
    // department_id: number;

    @ApiProperty()
    @IsString()
    @MaxLength(200)
    kh_name: string;

    @ApiProperty()
    @IsString()
    @MaxLength(200)
    en_name: string;
}

export class updateUsersOfficeDTO extends createUsersOfficeDTO{}
