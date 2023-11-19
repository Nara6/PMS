/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";


export class LoginDTO{
    @ApiProperty()
    @IsString() 
    @IsNotEmpty()
    username: string
    @ApiProperty()
    @IsString() 
    @IsNotEmpty()
    @MinLength(6)
    password: string

}

