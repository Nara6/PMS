/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/entity/user/users.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersDepartment } from 'src/entity/user/users_department.entity';
import { UsersPosition } from 'src/entity/user/users_position.entity';
import { UsersOffice } from 'src/entity/user/users_office.entity';
import { UsersRole } from 'src/entity/user/users_role.entity';
import { UsersTitle } from 'src/entity/user/users_title.entity';
import { ProjectsUser } from 'src/entity/project/projects_user.entity';

@Module({
    imports: [TypeOrmModule.forFeature(
        [
            Users, 
            UsersDepartment, 
            UsersPosition,
            UsersOffice,
            UsersRole,
            UsersTitle,
            ProjectsUser
        ]
        )
    ],
    providers: [UsersService],
    controllers: [UsersController],
    exports: [UsersService]
})
export class UsersModule {}
