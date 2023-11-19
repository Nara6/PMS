/* eslint-disable prettier/prettier */
import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entity/user/users.entity';
import { Repository } from 'typeorm';
import { LoginDTO } from './auth.dto';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken'

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Users)
        private readonly usersRepository: Repository<Users>,
    ) { }
    async login(loginDTO: LoginDTO) {
        const { username, password } = loginDTO;
        const user = await this.usersRepository.findOne(
            {
                where: {
                    username: username
                },
                relations: {
                    role: true,
                    title: true,
                    position: true,
                    department: true,
                    office: true,
                },
                select: {
                    role: {
                        id: true,
                        en_name: true
                    },
                    title: {
                        id: true,
                        en_name: true,
                        kh_name: true,
                    },
                    position: {
                        id: true,
                        en_name: true,
                        kh_name: true,
                    },
                    department: {
                        id: true,
                        en_name: true,
                        kh_name: true,
                    },
                    office: {
                        id: true,
                        en_name: true,
                        kh_name: true,
                    }
                }
            }
        );
        if (!user) {
            throw new HttpException('Invalid Credential!', 400);
        }
        // console.log(password, user.password);

        const existingPassword: boolean = await bcrypt.compare(password, user.password);
        if (!existingPassword) {
            throw new HttpException('Incorrect Password!, Please make sure you enter a correct password', 400);
        }
        delete user.password;
        delete user.created_at;
        delete user.updated_at;
        delete user.deleted_at;
        const token: string = await this.generateToken(user);
        const currentTimestamp: number = Date.now();
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            timeZone: 'Asia/Phnom_Penh' // Time zone for Cambodia
        };

        const formattedDateTimeInCambodia: string =
        new Date(currentTimestamp).toLocaleString('en-US', options);

        await this.usersRepository.update(
            {
                id: user.id
            },
            {
                last_activity: formattedDateTimeInCambodia
            }
        )
        return {
            success: true,
            token_type: 'bearer',
            data: user,
            token: token
        }
    }
    private generateToken(user: any) {
        return jwt.sign(
            {
                id: user.id,
                vpn_account: user.vpn_account,
                kh_name: user.kh_name,
                en_name: user.en_name,
                email: user.email,
                phone: user.phone,
                avatar: user.avatar,
                role: user.role.en_name,
                role_id: user.role.id,
                username: user.username,
                tg_username: user.tg_username,
                about: user.about,
                title: {
                    id: user.title.id,
                    name: user.title.en_name,
                }
                ,
                department: {
                    id: user.department.id,
                    name: user.department.en_name
                },
                position:{ 
                    id: user.position.id,
                    name: user.position.en_name
                },
                office:{ 
                    id: user.office.id,
                    name: user.office.en_name
                }

            },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: '1d'
            }
        )

    }
}
