/* eslint-disable prettier/prettier */
import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsDateString, IsNotEmpty, IsNumber, IsPositive, IsString} from "class-validator";


  
export class CreateProjectTimeLineDTO{
    @ApiProperty()
    @IsNotEmpty()
    @IsPositive()
    @IsNumber()
    project_id: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsPositive()
    @IsNumber()
    status_id: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    task: string;

    @ApiProperty()
    @IsDateString()
    @IsNotEmpty()
    from : Date;

    @ApiProperty()
    @IsDateString()
    @IsNotEmpty()
    to : Date;
}

export class UpdateProjectTimeLineDTO extends CreateProjectTimeLineDTO{}