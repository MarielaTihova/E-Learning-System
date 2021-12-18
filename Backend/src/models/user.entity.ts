import { UserRole } from './enums/user-role';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, ManyToMany } from "typeorm";

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
}
