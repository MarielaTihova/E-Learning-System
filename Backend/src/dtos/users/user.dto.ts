import { Book } from '../../models/book.entity';
import { Review } from 'src/models/review.entity';
export class UserDTO {
    id: number;
    username: string;
    personalName: string;
    isDeleted: boolean;
    avatar: string;
    registerDate: Date;
    booksBorrowed: Book[];
    bookReviews: Review[];
}