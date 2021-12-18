import { User } from "src/models/user.entity";
import { Review } from "src/models/review.entity";
import { Rating } from "src/models/rating.entity";

export class BookDTO {
    id: number;

    name: string;
    author: string;

    borrower: User;

    reviews: Review[];

    ratings: Rating[];
    wasBorrowedBy: User[];

    isDeleted: boolean;

    poster: string;

    summary: string;
}