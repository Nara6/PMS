import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateProjectTypeDTO{
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;
}
export class UpdateProjectTypeDTO extends CreateProjectTypeDTO{}