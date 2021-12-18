import { IsString, IsNotEmpty } from 'class-validator';

export class UserLoginDTO {
  @IsString()
  @IsNotEmpty()
  username: string;
  @IsString()
  @IsNotEmpty()
  password: string;
}
