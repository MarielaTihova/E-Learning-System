import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, ManyToMany, JoinTable, CreateDateColumn } from "typeorm";
import { Course } from './course.entity';
import { TaskAnswer } from "./task-answer.entity";

@Entity('tasks')
export class Task {

    // Basic
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    description: string;

    @Column()
    availableFrom: string;

    @Column()
    availableTo: string;

    @Column({ default: false })
    isDeleted: boolean;

    // Relations
    @ManyToOne(() => Course, course => course.tasks)
    course: Course;

    @OneToMany(() => TaskAnswer, answer => answer.task)
    answers: TaskAnswer[];
} 
