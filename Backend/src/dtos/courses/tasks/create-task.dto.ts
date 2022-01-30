
import { IsString, Length } from "class-validator";
export class CreateTaskDTO {
    @IsString()
    @Length(2, 100)
    description: string;
    @IsString()
    @Length(5, 256)
    availableFrom: string;
    @IsString()
    @Length(4, 20)
    availableTo: string;
}
