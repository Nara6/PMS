/* eslint-disable prettier/prettier */
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsEnum, IsInt, IsOptional, Max, Min } from "class-validator";

interface PageMetaDtoParameters {
    pageOptionDTO: PageOptionDTO;
    itemCount: number;
}
export class PageMetaDto {
    @ApiProperty()
    readonly currentPage: number;

    @ApiProperty()
    readonly perPage: number;

    @ApiProperty()
    readonly totalItems: number;

    @ApiProperty()
    readonly totalPages: number;

    @ApiProperty()
    readonly hasPreviousPage: boolean;

    @ApiProperty()
    readonly hasNextPage: boolean;

    constructor({ pageOptionDTO, itemCount }: PageMetaDtoParameters) {
        this.currentPage = pageOptionDTO.page;
        this.perPage = pageOptionDTO.limit;
        this.totalItems = itemCount;
        this.totalPages = Math.ceil(this.totalItems / this.perPage);
        this.hasPreviousPage = this.currentPage > 1;
        this.hasNextPage = this.currentPage < this.totalPages;
    }
}
export class PageDto<T> {
    @IsArray()
    @ApiProperty({ isArray: true })
    readonly data: T[];

    @ApiProperty({ type: () => PageMetaDto })
    readonly pagination: PageMetaDto;

    constructor(data: T[], meta: PageMetaDto) {
        this.data = data;
        this.pagination = meta;
    }
}

enum Order {
    ASC = "ASC",
    DESC = "DESC",
}
export class PageOptionDTO {
    @ApiPropertyOptional({ enum: Order, default: Order.ASC })
    @IsEnum(Order)
    @IsOptional()
    readonly order?: Order = Order.ASC;

    @ApiPropertyOptional({
        minimum: 1,
        default: 1,
    })
    @Type(() => Number)
    @IsInt()
    @Min(1)
    @IsOptional()
    readonly page?: number = 1;

    @ApiPropertyOptional({
        minimum: 1,
        maximum: 50,
        default: 10,
    })
    @Type(() => Number)
    @IsInt()
    @Min(1)
    @Max(50)
    @IsOptional()
    readonly limit?: number = 10;
    get skip(): number {
        return (this.page - 1) * this.limit;
    }
}