import { Book } from '../models/book.entity';
import { Review } from 'src/models/review.entity';
export class JWTPayload {
  id: number;
  username: string;
  personalName: string;

  role: string;

  avatar: string;

  registerDate: Date;
}
