import { Controller, Post, Body, Delete } from '@nestjs/common';
import { AuthService } from 'src/services/auth.service';
import { UserLoginDTO } from 'src/dtos/users/user-login.dto';
import { GetToken } from 'src/auth/get-token.decorator';

@Controller('session')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) { }

  // PUBLIC
  @Post()
  async login(@Body() user: UserLoginDTO): Promise<{ token: string }> {
    return await this.authService.login(user);
  }

  // PUBLIC - logout
  @Delete()
  async logout(@GetToken() token: string): Promise<{ message: string }> {
    await this.authService.blacklist(token?.slice(7));

    return {
      message: 'You have been logged out!',
    };
  }
}
