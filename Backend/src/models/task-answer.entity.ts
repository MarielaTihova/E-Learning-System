import { User } from './user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, ManyToMany, JoinTable, CreateDateColumn } from "typeorm";
import { Course } from './course.entity';
import { Task } from './task.entity';

@Entity('answers')
export class TaskAnswer {

    // Basic
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    answerText: string;

    // Relations
    @ManyToOne(() => Task, task => task.answers)
    task: Task;

    @ManyToOne(() => User, student => student.taskAnswers)
    answeredBy: User;

    @ManyToOne(() => Course, course => course.tasks)
    course: Course;
} 
