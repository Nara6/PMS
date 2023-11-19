/* eslint-disable prettier/prettier */
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { InjectRepository } from "@nestjs/typeorm";
import * as jwt from 'jsonwebtoken';
import { Users } from "src/entity/user/users.entity";
import { Repository } from "typeorm";
interface JwtPayload {
    id: number,
    role: string
}

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        @InjectRepository(Users)
        private readonly usersRepository: Repository<Users>,
        private reflector: Reflector
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        // get role requirement
        // console.log(context.switchToHttp().getRequest());
        
        const role = this.reflector.getAllAndOverride<string[]>('roles', [
            context.getHandler(),
            context.getClass()
        ])
        // console.log(role);
        
        if (role) {
            // get the context of the request
            
            const request = context.switchToHttp().getRequest();
            // Split the token from request header
            const token: string = request.headers?.authorization?.split('Bearer ')[1];
            try {
                // translate the token and check does token valid.
                const payload = jwt.verify(token, process.env.JWT_SECRET_KEY) as JwtPayload;

                if (!payload) return false;
                if (!role.includes(payload.role)) return false;
                return true;
            } catch (err) {
                if (err && err.message) {
                    if (err.message.includes('jwt expired')) {
                        throw new UnauthorizedException('Token has been expired')
                    } else if (err.message.includes('jwt must be provided')) {
                        throw new UnauthorizedException('Token must be provided')
                    } else if (err.message.includes('jwt malformed')) {
                        throw new UnauthorizedException('Token is invalid')
                    }
                }
                return false
            }
        }


    }
}