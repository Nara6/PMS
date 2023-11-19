/* eslint-disable prettier/prettier */
import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsString, MaxLength } from "class-validator";

export class createUsersTitleDTO{
    @ApiProperty()
    @IsString()
    @MaxLength(200)
    kh_name: string;

    @ApiProperty()
    @IsString()
    @MaxLength(200)
    en_name: string;
}
export class updateUsersTitleDTO extends createUsersTitleDTO{}