import { AuthGuard } from '@nestjs/passport';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
 
@Injectable()
export class BlacklistGuard extends AuthGuard('jwt') implements CanActivate {
 
  constructor(
    private readonly authService: AuthService,
  ) {
    super();
  }
 
  public async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const baseActivation = await super.canActivate(ctx);
    if (!baseActivation) {
      return false;
    }
 
    // token is valid
    // check if blacklisted
    const request = ctx.switchToHttp().getRequest();
    const token = request.headers.authorization?.slice(7);
 
    return !(await this.authService.isBlacklisted(token));
  }
 
}