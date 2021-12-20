import { Module } from '@nestjs/common';
import { ServicesModule } from 'src/services/services.module';
import { UsersController } from './users.controller';
import { AuthController } from './auth.controller';
import { CoursesController } from './courses.controller';

@Module({
  imports: [ServicesModule],
  controllers: [UsersController, AuthController, CoursesController]
})
export class ControllersModule { }
