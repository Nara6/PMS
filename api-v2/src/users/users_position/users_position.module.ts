import { Module } from '@nestjs/common';
import { UsersPositionService } from './users_position.service';
import { UsersPositionController } from './users_position.controller';
import { UsersPosition } from 'src/entity/user/users_position.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([UsersPosition])],
  providers: [UsersPositionService],
  controllers: [UsersPositionController]
})
export class UsersPositionModule {}
