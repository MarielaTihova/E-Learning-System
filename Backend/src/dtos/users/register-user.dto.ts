
import { IsNumber, IsString, Length, Matches } from "class-validator"
export class RegisterUserDTO {
    @IsString()
    @Length(5, 30)
    username: string;
    @IsString()
    @Length(5, 30)
    personalName: string;
    @IsString()
    @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/, {
        message:
            'The password must be minimum five characters, at least one letter and one number',
    })

    password: string;
    // @IsNumber()
    // role: number;
}
