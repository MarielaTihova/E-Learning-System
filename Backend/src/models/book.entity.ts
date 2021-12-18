import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, OneToMany, ManyToMany, JoinTable } from "typeorm"
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

    @OneToMany(() => Review, review => review.bookName)
    reviews: Review[];

    @OneToMany(() => Rating, rate => rate.bookName)
    ratings: Rating[];

    @Column({ default: false })
    isDeleted: boolean;

    @Column()
    poster: string;

    @Column()

    summary: string;

}
