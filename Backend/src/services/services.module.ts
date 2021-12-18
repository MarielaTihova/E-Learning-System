import { Token } from './../models/token.entity';
import { JwtStrategy } from './strategy/jwt-strategy';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransformService } from './transform.service';
import { User } from 'src/models/user.entity';
import { UsersService } from './users.service';
import { Book } from 'src/models/book.entity';
import { Review } from 'src/models/review.entity';
import { Rating } from 'src/models/rating.entity';
import { ReviewReaction } from 'src/models/review-reaction.entity';
import { BooksService } from './books.service';
import {PassportModule} from '@nestjs/passport'
import {JwtModule} from '@nestjs/jwt'
import { jwtConstants } from 'src/constant/secret';
import { AuthService } from './auth.service';
import { ReviewReactionsService } from './review-reactions.service';




@Module({
    imports: [TypeOrmModule.forFeature([User, Book, Review, Rating, ReviewReaction, Token]),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {
        expiresIn: '7d',
      }
    }),],
    providers: [UsersService, BooksService, TransformService, ReviewReactionsService, AuthService, JwtStrategy],
    exports: [UsersService, BooksService, TransformService,ReviewReactionsService, AuthService] // AuthService
})
export class ServicesModule { }
