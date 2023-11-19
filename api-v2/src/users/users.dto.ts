/* eslint-disable prettier/prettier */
import { ApiProperty, PartialType } from "@nestjs/swagger";
import {  IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, Matches, MinLength } from "class-validator";

export class UpdateUserDTO {

    @ApiProperty()
    @IsPositive()
    @IsNumber()
    @IsNotEmpty()
    // @IsOptional()
    // @IsEnum(testing)
    department_id?: number

    @ApiProperty()
    @IsPositive()
    @IsNumber()
    @IsNotEmpty()
    // @IsOptional()
    office_id?: number

    @ApiProperty()
    @IsPositive()
    @IsNumber()
    @IsNotEmpty()
    // @IsOptional()
    position_id?: number

    @ApiProperty()
    @IsPositive()
    @IsNumber()
    @IsNotEmpty()
    // @IsOptional()
    title_id?: number

    @ApiProperty()
    @IsPositive()
    @IsNumber()
    @IsNotEmpty()
    // @IsOptional()
    role_id?: number

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    username: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    vpn_account: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    kh_name: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    en_name: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    about: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    tg_username: string

    @ApiProperty()
    @Matches(/^(\+855|0)[1-9]\d{7,8}$/, {
        message: 'Phone must be valit Cambodia phone number'
    })
    phone: string;

    @ApiProperty()
    @IsEmail()
    email: string 

    @ApiProperty(
        {
            type: 'string',
            format: 'binary',
        }
    )
    @IsString()
    @IsNotEmpty()
    avatar: any
}

export class CreateUserDTO extends UpdateUserDTO{
    @ApiProperty()
    @MinLength(6)
    @IsString()
    password: string
}

export class UpdatePasswordDTO {
    @ApiProperty()
    @MinLength(6)
    @IsString()
    oldpassword: string

    @ApiProperty()
    @MinLength(6)
    @IsString()
    newPassword: string
    
    @ApiProperty()
    @MinLength(6)
    @IsString()
    @Matches('newPassword')
    newConfirmPassword: string
}

export class UpdatePasswordByAdminDTO {
    @ApiProperty()
    @MinLength(6)
    @IsString()
    newPassword: string
    @ApiProperty()
    @MinLength(6)
    @IsString()
    newConfirmPassword: string
}

export class UpdatePasswordByOwnDTO {
    @ApiProperty()
    @MinLength(6)
    @IsString()
    oldPassword: string
    @ApiProperty()
    @MinLength(6)
    @IsString()
    newPassword: string
    @ApiProperty()
    @MinLength(6)
    @IsString()
    newConfirmPassword: string
}