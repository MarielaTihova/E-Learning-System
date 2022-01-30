
import { IsString, Length, Matches } from "class-validator"
import { DayOfWeek } from "src/models/enums/day-of-week";
export class CreateCourseDTO {
    @IsString()
    @Length(2, 100)
    name: string;
    @IsString()
    @Length(5, 256)
    description: string;
    @IsString()
    @Length(4, 20)
    startTime: string;
    @IsString()
    @Length(4, 20)
    endTime: string;
    dayOfWeek: DayOfWeek;
}
