import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersOffice } from 'src/entity/user/users_office.entity';
import { UsersOfficeController } from './users_office.controller';
import { UsersOfficeService } from './users_office.service';
import { UsersDepartment } from 'src/entity/user/users_department.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UsersOffice, UsersDepartment])],
  controllers: [UsersOfficeController],
  providers: [UsersOfficeService]
})
export class UsersOfficeModule {}
