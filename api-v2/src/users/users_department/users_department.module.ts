import { Module } from '@nestjs/common';
import { UsersDepartmentService } from './users_department.service';
import { UsersDepartmentController } from './users_department.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersDepartment } from 'src/entity/user/users_department.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UsersDepartment])],
  providers: [UsersDepartmentService],
  controllers: [UsersDepartmentController],
})
export class UsersDepartmentModule {}
