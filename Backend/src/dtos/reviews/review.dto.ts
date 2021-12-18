import { User } from '../../models/user.entity';
import { Book } from '../../models/book.entity';
import { ReviewReaction } from '../../models/review-reaction.entity';
export class ReviewDTO {

    id: number
    text: string;
    votes: ReviewReaction[];
    bookName: Book;
    madeBy: User;
    isDeleted: boolean;
}