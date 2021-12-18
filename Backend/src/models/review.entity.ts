import { User } from './user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Book } from "./book.entity";
import { ReviewReaction } from "./review-reaction.entity";

@Entity('reviews')
export class Review {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ type: 'nvarchar', nullable: false, length: 300 })
    text: string;

    @OneToMany(() => ReviewReaction, revReact => revReact.reviewVotedFor, { onDelete: "CASCADE" })
    votes: ReviewReaction[]; // enum - like, dislike, love, hug, cry, wow

    @ManyToOne(() => Book, book => book.reviews)
    bookName: Book;

    @ManyToOne(() => User, user => user.bookReviews)
    madeBy: User

    @Column({ default: false })
    isDeleted: boolean;
}