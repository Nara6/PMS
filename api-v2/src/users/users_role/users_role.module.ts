import { Module } from '@nestjs/common';
import { UsersRoleService } from './users_role.service';
import { UsersRoleController } from './users_role.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRole } from 'src/entity/user/users_role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UsersRole])],
  controllers: [UsersRoleController],
  providers: [UsersRoleService],
})
export class UsersRoleModule {}
