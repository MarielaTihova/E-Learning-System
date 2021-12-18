import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from "typeorm";
import { Book } from "./book.entity";
import { User } from "./user.entity";
import { RatingPoints } from "./enums/rating-points";

@Entity('ratings')
export class Rating {
    @PrimaryGeneratedColumn()
    id: number;
    @ManyToOne(() => Book, book => book.ratings)
    bookName: Book;

    @Column({ type: 'int', nullable: false })
    points: RatingPoints;
}
