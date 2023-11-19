/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UsersLogService } from './users_log.service';
import { UsersLogController } from './users_log.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersLog } from 'src/entity/user/users_log.entity';
import { Users } from 'src/entity/user/users.entity';

@Module({
    imports: [TypeOrmModule.forFeature([UsersLog,Users])],
    providers: [UsersLogService],
    controllers: [UsersLogController]
})
export class UsersLogModule {}
