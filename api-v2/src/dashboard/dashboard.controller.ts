/* eslint-disable prettier/prettier */
import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DashboardService } from './dashboard.service';

@ApiTags('Dashboard')
@Controller('api/dashboard')
export class DashboardController {
    constructor(
        private readonly dashboradService: DashboardService,
    ){}
    // ============>> Listing Controller
    @Get()
    async listing(): Promise<any>{
        return await this.dashboradService.listing();
    }
}
