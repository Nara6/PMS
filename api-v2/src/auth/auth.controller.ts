/* eslint-disable prettier/prettier */
import { Body, Controller, Post} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LoginDTO } from './auth.dto';
import { AuthService } from './auth.service';

@ApiTags('auth')
@Controller('api/auth')
export class AuthController {

    constructor(
        private readonly authService:AuthService, 
    ){}
    @Post('login')
    async login(@Body() loginDTO: LoginDTO) {
        return await this.authService.login(loginDTO);
    }
}
