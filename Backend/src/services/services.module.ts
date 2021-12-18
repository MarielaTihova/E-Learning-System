import { Token } from './../models/token.entity';
import { JwtStrategy } from './strategy/jwt-strategy';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransformService } from './transform.service';
import { User } from 'src/models/user.entity';
import { UsersService } from './users.service';
import {PassportModule} from '@nestjs/passport'
import {JwtModule} from '@nestjs/jwt'
import { jwtConstants } from 'src/constant/secret';
import { AuthService } from './auth.service';

@Module({
    imports: [TypeOrmModule.forFeature([User, Token]),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {
        expiresIn: '7d',
      }
    }),],
    providers: [UsersService, TransformService,  AuthService, JwtStrategy],
    exports: [UsersService, TransformService, AuthService] // AuthService
})
export class ServicesModule { }
