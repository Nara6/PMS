import { Module } from '@nestjs/common';
import { UsersTitleService } from './users_title.service';
import { UsersTitleController } from './users_title.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersTitle } from 'src/entity/user/users_title.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UsersTitle])],
  providers: [UsersTitleService],
  controllers: [UsersTitleController]
})
export class UsersTitleModule {}
