import { User } from './user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";

@Entity('reviews')
export class Course {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column()
    teacher: User; // Teacher
    @Column()
    students: User[]; //Student[]

    @Column()
    materials: any[]; // Files with meterials
    @Column()
    tasks: any[];
    @Column()
    tests: any[];
    // @Column({ type: 'nvarchar', nullable: false, length: 300 })
    // text: string;

    // @OneToMany(() => ReviewReaction, revReact => revReact.reviewVotedFor, { onDelete: "CASCADE" })
    // votes: ReviewReaction[]; // enum - like, dislike, love, hug, cry, wow

    // @ManyToOne(() => Book, book => book.reviews)
    // bookName: Book;

    // @ManyToOne(() => User, user => user.bookReviews)
    // madeBy: User

    // @Column({ default: false })
    // isDeleted: boolean;
}