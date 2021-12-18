import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, OneToMany, ManyToMany, JoinTable } from "typeorm"
import { User } from "./user.entity"
import { Review } from "./review.entity";
import { Rating } from "./rating.entity";

@Entity('books')
export class Book {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    name: string;

    @Column({ nullable: false })
    author: string;

    @ManyToOne(() => User, user => user.booksBorrowed)
    borrower: User; //(if NULL - not borrowed, if !NULL - borrowed)

    @OneToMany(() => Review, review => review.bookName)
    reviews: Review[];

    @OneToMany(() => Rating, rate => rate.bookName)
    ratings: Rating[];

    @ManyToMany(() => User, user => user.booksBorrowedHistory)
    @JoinTable()
    wasBorrowedBy: User[];

    @Column({ default: false })
    isDeleted: boolean;

    @Column()
    poster: string;

    @Column()

    summary: string;

}
