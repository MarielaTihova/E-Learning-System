import { Module } from '@nestjs/common';
import { ServicesModule } from 'src/services/services.module';
import { UsersController } from './users.controller';
import { BooksController } from './books.controller';
import { AuthController } from './auth.controller';
import { ReviewReactionsController } from './review-reactions.controller';


@Module({
  imports: [ServicesModule],
  controllers: [UsersController, BooksController,ReviewReactionsController, AuthController]
})
export class ControllersModule { }
