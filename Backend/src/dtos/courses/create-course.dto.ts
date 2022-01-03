
import { IsString, Length, Matches } from "class-validator"
import { DayOfWeek } from "src/models/enums/day-of-week";
// import { CourseSchedule } from "src/models/course-schedule.entity";
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
    // schedule: CourseSchedule[];
}
