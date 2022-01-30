import { Token } from './../models/token.entity';
import { JwtStrategy } from './strategy/jwt-strategy';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransformService } from './transform.service';
import { User } from 'src/models/user.entity';
import { UsersService } from './users.service';
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { jwtConstants } from 'src/constant/secret';
import { AuthService } from './auth.service';
import { CoursesService } from './courses.service';
import { Course } from 'src/models/course.entity';
import { Task } from 'src/models/task.entity';
import { TaskAnswer } from 'src/models/task-answer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Token, Course, Task, TaskAnswer]),
    PassportModule,
  JwtModule.register({
    secret: jwtConstants.secret,
    signOptions: {
      expiresIn: '7d',
    }
  }),],
  providers: [UsersService, TransformService, AuthService, JwtStrategy, CoursesService],
  exports: [UsersService, TransformService, AuthService, CoursesService]
})
export class ServicesModule { }
