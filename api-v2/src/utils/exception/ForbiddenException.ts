/* eslint-disable prettier/prettier */
import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus, ForbiddenException } from '@nestjs/common';

@Catch(ForbiddenException)
export class CustomForbiddenException implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        response.status(HttpStatus.FORBIDDEN).json({
            statusCode: HttpStatus.FORBIDDEN,
            error: 'Forbidden',
            message: 'YOU DO NOT HAVE THE PERMISSION TO SEND REQUEST!',
        });
    }
}
