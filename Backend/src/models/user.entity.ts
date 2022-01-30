import { UserRole } from './enums/user-role';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, ManyToMany } from "typeorm";
import { Course } from './course.entity';
import { TaskAnswer } from './task-answer.entity';

@Entity('users')
export class User {

    // Basic
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    username: string;

    @Column({ length: 30 })
    personalName: string;

    @Column({ nullable: false, type: 'varchar', /*length: Between(5, 15) */ })
    password: string;

    @CreateDateColumn()
    registerDate: Date;

    @Column({ default: false })
    isDeleted: boolean;

    @Column({ type: 'enum', enum: UserRole, default: UserRole.Student })

    role: UserRole;

    @Column({ nullable: true })
    banEndDate: Date;

    // Relations
    @ManyToMany(() => Course, course => course.participants)
    courses: Course[];

    @OneToMany(() => TaskAnswer, taskAnswer => taskAnswer.answeredBy)
    taskAnswers: TaskAnswer[];
}
