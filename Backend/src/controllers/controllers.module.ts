import { Module } from '@nestjs/common';
import { ServicesModule } from 'src/services/services.module';
import { UsersController } from './users.controller';
import { AuthController } from './auth.controller';

@Module({
  imports: [ServicesModule],
  controllers: [UsersController, AuthController]
})
export class ControllersModule { }
