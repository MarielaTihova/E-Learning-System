import { Book } from "src/models/book.entity";
import { RatingPoints } from "src/models/enums/rating-points";
import { User } from "src/models/user.entity";

export class RatingDTO {
    id: number;
    bookName: Book;
    points: RatingPoints;
    madeBy: User;
}