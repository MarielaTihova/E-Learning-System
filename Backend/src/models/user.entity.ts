import { UserRole } from './enums/user-role';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, ManyToMany } from "typeorm";
import { Book } from "./book.entity";
import { ReviewReaction } from "./review-reaction.entity";
import { Rating } from "./rating.entity";
import { Review } from "./review.entity";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    username: string;

    @Column({ length: 30 })
    personalName: string;

    @Column({ nullable: false, type: 'varchar', /*length: Between(5, 15) */ })
    password: string;

    @CreateDateColumn()
    registerDate: Date  // date of registering

    // @OneToMany(() => Book, book => book.borrower)
    // booksBorrowed: Book[]

    // @OneToMany(() => ReviewReaction, reaction => reaction.madeBy)
    // bookVotes: ReviewReaction[];

    // @OneToMany(() => Rating, rating => rating.madeBy)
    // bookRatings: Rating[];

    // @OneToMany(() => Review, review => review.madeBy)
    // bookReviews: Review[];

    @Column({ default: false })
    isDeleted: boolean;

    // @ManyToMany(() => Book, book => book.wasBorrowedBy)
    // booksBorrowedHistory: Book[];

    @Column({ type: 'enum', enum: UserRole, default: UserRole.Student })

    role: UserRole;

    @Column({ nullable: true })
    banEndDate: Date;

    //@Column({ default: "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2F2.bp.blogspot.com%2F-kaQX-JRUirM%2FVajwSpRbPEI%2FAAAAAAAAYGU%2F2SINxtyiZrQ%2Fs1600%2FClassDojo%252Bmonster%252B21.png&f=1&nofb=1" })
    @Column()
    avatar: string;
}