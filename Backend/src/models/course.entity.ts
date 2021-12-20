import { User } from './user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, ManyToMany, JoinTable } from "typeorm";
import { start } from 'repl';
import { CourseSchedule } from './course-schedule.entity';
// import { Student } from './student.entity';

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
    // tasks: any[];
    // @Column()
    // tests: any[];

    @OneToMany(() => CourseSchedule, schedule => schedule.course)
    schedule: CourseSchedule[];

    // Relations
    @ManyToMany(() => User, user => user.courses)
    @JoinTable()
    participants: User[];
} 
