import { IsNumber, IsPositive } from 'class-validator';

export class UserBanDTO {
  @IsNumber()
  @IsPositive()
  period: number;
}