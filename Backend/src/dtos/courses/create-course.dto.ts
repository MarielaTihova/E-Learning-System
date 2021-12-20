
import { IsString, Length, Matches } from "class-validator"
import { CourseSchedule } from "src/models/course-schedule.entity";
export class CreateCourseDTO {
    @IsString()
    @Length(2, 100)
    name: string;
    @IsString()
    @Length(5, 256)
    description: string;
    // schedule: CourseSchedule[];
}
