import { Module } from '@nestjs/common';
import { ControllersModule } from './controllers/controllers.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ControllersModule,
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'my_library',
      entities: ["dist/**/*.entity{.ts,.js}"],
      synchronize: true
    })]
})
export class AppModule { }
