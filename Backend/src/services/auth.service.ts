import { UserRole } from './../models/enums/user-role';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/models/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { JWTPayload } from 'src/common/jwt-paylouds';
import * as bcrypt from 'bcrypt'
import { UserLoginDTO } from 'src/dtos/users/user-login.dto';
import { Token } from 'src/models/token.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Token) private readonly tokenRepository: Repository<Token>,
    private readonly jwtService: JwtService,
  ) { }

  async findUserByName(username: string) {
    return await this.userRepository.findOne({
      where: {
        username,
        isDeleted: false,
      },
      // relations: ['booksBorrowed', 'bookReviews', 'booksBorrowedHistory']
    });
  }

  async blacklist(token: string) {
    const tokenEntity = this.tokenRepository.create();
    tokenEntity.token = token;

    await this.tokenRepository.save(tokenEntity);
  }

  async isBlacklisted(token: string): Promise<boolean> {
    return Boolean(await this.tokenRepository.findOne({
      where: {
        token,
      }
    }));
  }

  async validateUser(username: string, password: string) {
    const user = await this.findUserByName(username);
    if (!user) {
      return null;
    }
    const isUserValidated = await bcrypt.compare(password, user.password);
    return isUserValidated
      ? user
      : null;
  }

  async login(loginUser: UserLoginDTO): Promise<{ token: string }> {
    const user = await this.validateUser(loginUser.username, loginUser.password);

    if (!user) {
      throw new UnauthorizedException('Wrong credentials!');
    }

    const payload: JWTPayload = {
      id: user.id,
      username: user.username,
      personalName: user.personalName,
      role: UserRole[user.role],
      registerDate: user.registerDate
    }

    const token = await this.jwtService.signAsync(payload);

    // this will be returned to the client on successful login
    return {
      token,
    };
  }

  // Logout

}
