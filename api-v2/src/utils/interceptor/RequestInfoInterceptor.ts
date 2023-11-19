/* eslint-disable prettier/prettier */
import { NestInterceptor, ExecutionContext, CallHandler, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class RequestInfoInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const ip = request.ip;
    const method = request.method;
    const endpoint = request.url;
    const dateTime = new Date().toLocaleString(); // Get the current date and time
    console.log(request);
    
    console.log(`\x1b[34m Incoming request from IP: ${ip}, Method: ${method}, Endpoint: ${endpoint}, DateTime: ${dateTime} \x1b[0m`);

    return next.handle();
  }
}