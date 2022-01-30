import { User } from './user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, ManyToMany, JoinTable, CreateDateColumn } from "typeorm";
// import { CourseSchedule } from './course-schedule.entity';
import { DayOfWeek } from './enums/day-of-week';
import { Task } from './task.entity';

@Entity('courses')
export class Course {

    // Basic
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;

    @Column()
    description: string;

    // @Column()
    // materials: any[]; // Files with meterials

    // @Column()
    // tests: any[];

    // @OneToMany(() => CourseSchedule, schedule => schedule.course)
    // schedule: CourseSchedule[];

    @Column()
    startTime: string;

    @Column()
    endTime: string;

    @Column({ type: 'enum', enum: DayOfWeek })

    dayOfWeek: DayOfWeek;

    // Relations
    @ManyToMany(() => User, user => user.courses)
    @JoinTable()
    participants: User[];

    @OneToMany(() => Task, task => task.course)
    tasks: Task[];
} 
