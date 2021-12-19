import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Course } from "./course.entity";
import { DayOfWeek } from "./enums/day-of-week";

@Entity('course_schedule')

export class CourseSchedule {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    start: string;
    @Column()
    end: string;
    @Column()
    dayOfWeek: DayOfWeek;


    @ManyToOne(() => Course, course => course.schedule)
    course: Course;
}