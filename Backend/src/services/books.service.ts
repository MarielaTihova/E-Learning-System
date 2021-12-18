/*import { Injectable, BadRequestException } from "@nestjs/common";
import { Repository, IsNull, Like } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { TransformService } from "./transform.service";
import { Book } from "src/models/book.entity";
import { Review } from "src/models/review.entity";
import { UpdateBookReviewDTO } from "src/dtos/reviews/update-book-review.dto";
import { BookDTO } from "src/dtos/books/book.dto";
import { ReviewDTO } from "src/dtos/reviews/review.dto";
import { User } from "src/models/user.entity";
import { UsersService } from "./users.service";
import { ReviewReaction } from "src/models/review-reaction.entity";
import { isNull } from "util";
import { Rating } from "src/models/rating.entity";
import { CreateRatingDTO } from "src/dtos/ratings/create-rating.dto";
import { RatingPoints } from "src/models/enums/rating-points";
import { RatingDTO } from "src/dtos/ratings/rating.dto";
import { CreateReviewDTO } from "src/dtos/reviews/create-review.dto";
import { CreateBookDTO } from "src/dtos/books/create-book.dto";
import { UpdateBookDTO } from "src/dtos/books/update-book.dto";
import { UserRole } from "src/models/enums/user-role";

@Injectable()
export class BooksService {
    constructor(
        private readonly transformer: TransformService,
        @InjectRepository(Book) private readonly booksRepository: Repository<Book>,
        @InjectRepository(Review) private readonly reviewsRepository: Repository<Review>,
        @InjectRepository(ReviewReaction) private readonly reviewReactionRepositoy: Repository<ReviewReaction>,
        @InjectRepository(Rating) private readonly rateRepository: Repository<Rating>,
        private readonly usersService: UsersService
    ) { }

    async getAllBooks(): Promise<BookDTO[]> {
        const allBooks = await this.booksRepository.find({
            order: {
                //name: "ASC",
                id: "ASC"
            },
            relations: ['borrower', 'reviews', 'ratings',
                'reviews.votes', 'ratings.madeBy',
                'reviews.votes.madeBy', 'reviews.madeBy']
        });

        return allBooks.filter(book => book.isDeleted === false);
    }

    async AllBooksByName(searchedName: string): Promise<BookDTO[]> {
        const allBooks = await this.booksRepository.find({
            order: {
                //name: "ASC",
                id: "ASC",
            },
            where: {
                name: Like(`%${searchedName}%`)//`%${searchedName}%`//searchedName
            },
            relations: ['borrower', 'reviews', 'ratings',
                'reviews.votes', 'ratings.madeBy',
                'reviews.votes.madeBy', 'reviews.madeBy', 'reviews.bookName']
        });

        return allBooks.filter(book => book.isDeleted === false);
    }



    async getBookById(id: number): Promise<BookDTO> {
        if (!this.booksRepository.find({ id: id, isDeleted: false })) {
            throw new BadRequestException(`Book with id ${id} does not exist!`);
        }
        const book = await this.booksRepository.findOne(id, {
            where: {
                isDeleted: false
            },
            relations: ['borrower', 'reviews', 'reviews.madeBy', 'ratings',
                'reviews.votes', 'ratings.madeBy',
                'reviews.votes.madeBy', 'wasBorrowedBy', 'reviews.bookName']
        });
        return book;
    }

    public async borrowABook(bookId: number, userId: number): Promise<BookDTO> {
        const user = await this.usersService.getUserById(userId);
        const book = await this.getBookById(bookId);//bookId

        const bookFound = await this.booksRepository.findOne(bookId, {
            where: {
                borrower: IsNull()
            },
            relations: ['ratings', 'ratings.madeBy', 'reviews', 'reviews.madeBy']
        });
        if (!bookFound) {
            throw new BadRequestException(`Book with id ${bookId} is already borrowed!`);
        }

        bookFound.borrower = user;
        this.booksRepository.save(bookFound);
        return bookFound;

    }
    public async returnBook(bookId: number, userId: number): Promise<BookDTO> {
        const user = await this.usersService.getUserById(userId)
        const book = await this.getBookById(user.id);//bookId

        const bookFound = await this.booksRepository.findOne(bookId, {
            where: {
                borrower: userId
            },
            relations: ['wasBorrowedBy', 'ratings', 'ratings.madeBy', 'reviews', 'reviews.madeBy']
        });
        if (!bookFound) {
            throw new BadRequestException(`Book with id ${bookId} is already borrowed from another user!`);
        }


        bookFound.borrower = null;
        bookFound.wasBorrowedBy.push(user);
        this.booksRepository.save(bookFound);
        return bookFound;
    }
    public async readBookReviews(id: number): Promise<ReviewDTO[]> {
        if (!this.booksRepository.find({ id: id })) {
            throw new BadRequestException(`Book with id ${id} does not exist!`);
        }

        const foundBook = await this.booksRepository.findOne(id, {
            relations: ['reviews', 'reviews.madeBy',
                'reviews.votes', 'reviews.votes.madeBy', 'reviews.bookName']
        });
        return foundBook.reviews.filter(rev => rev.isDeleted === false);
    }

    public async getBookReviewById(bookId: number,
        reviewId: number): Promise<ReviewDTO> {
        if (!this.booksRepository.find({ id: bookId })) {
            throw new BadRequestException(`Book with id ${bookId} does not exist!`);
        }
        const foundBook = await this.booksRepository.findOne(bookId, {
            relations: ['reviews', 'reviews.madeBy',
                'reviews.votes', 'reviews.votes.madeBy', 'reviews.bookName']
        });

        if (foundBook.reviews.length == 0) {
            throw new BadRequestException(`The book with id: ${foundBook.id} and name: ${foundBook.name} has no reviews`);
        }
        if (!foundBook.reviews.find(rev => rev.id === reviewId || rev.isDeleted === true)) {
            throw new BadRequestException(`No review with id: ${reviewId} for book with id: ${bookId}`);
        }

        const reviewWanted = foundBook.reviews.find(rev => rev.id === reviewId && rev.isDeleted === false);
        return reviewWanted;
    }

    public async createBookReview(review: CreateReviewDTO, bookId: number, userId: number): Promise<ReviewDTO> {
        const user = await this.usersService.getUserById(userId);
        // Find a book by Id or throw no book
        const foundBook = await this.getBookById(bookId);
        // create book from the dto
        if (review.text) {
            const createReview = await this.reviewsRepository.create(review);
            createReview.bookName = foundBook;
            createReview.madeBy = user;

            const createdBookReview = await this.reviewsRepository.save(createReview)
            return createdBookReview;
        } else {
            throw new BadRequestException(`Cannot crete an empty review!`);
        }

    }

    public async updateReviewById(bookId: number, reviewId: number,
        newReview: UpdateBookReviewDTO, userId: number): Promise<ReviewDTO> {
        const user = await this.usersService.getUserById(userId);
        const userReviews = await this.usersService.readUserReviews(user.id);
        if (!userReviews.find(rev => rev.id === reviewId || rev.isDeleted === true)
            && user.role !== UserRole.Admin) {
            throw new BadRequestException(`Review with id: ${reviewId} is not made by user with id: ${userId}!
             Cannot update review that is not yours!`);
        }

        if ((!userReviews.find(rev => rev.id === reviewId || rev.isDeleted === true)
            && user.role === UserRole.Admin) || userReviews.find(rev => rev.id === reviewId || rev.isDeleted === true)) {
            // taking review by the book it belongs to
            const currentReview = await this.getBookReviewById(bookId, reviewId);
            currentReview.text = newReview.text;

            this.reviewsRepository.save(currentReview);
            return currentReview;
        }
    }

    public async deleteReviewById(bookId: number, reviewId: number,
        userId: number): Promise<ReviewDTO> {
        const user = await this.usersService.getUserById(userId);
        const userReviews = await this.usersService.readUserReviews(user.id);

        if (!userReviews.find(rev => rev.id === reviewId || rev.isDeleted === false)
            && user.role !== UserRole.Admin) {
            throw new BadRequestException(`Review with id: ${reviewId} is not made by user with id: ${userId}!
                 Cannot delete review that is not yours!`);
        }

        if ((!userReviews.find(rev => rev.id === reviewId || rev.isDeleted === false)
            && user.role === UserRole.Admin) || userReviews.find(rev => rev.id === reviewId || rev.isDeleted === false)) {
            const currentReview = await this.getBookReviewById(+bookId, +reviewId);
            currentReview.isDeleted = true;
            this.reviewsRepository.save(currentReview);
            return currentReview;
        }
    }
    public async rateBook(bookId: number, userId: number, ratingPoints: CreateRatingDTO): Promise<RatingDTO> {
        const book = await this.booksRepository.findOne(bookId, {
            relations: ['wasBorrowedBy']
        });
        const user = await this.usersService.getUserById(userId);

        const userHasBorrowedBook = book.wasBorrowedBy.find(user => user.id === userId);
        if (!userHasBorrowedBook) {
            throw new BadRequestException(`To rate a book you should first read it (BORROW and RETURN)!`);
        }

        // Review  for the  book with id=bookId made by user with id=userId exists?
        const reviewFound = await this.reviewsRepository.findOne({ where: { bookName: book, madeBy: user, isDeleted: false } });
        if (!reviewFound) {
            throw new BadRequestException(`To rate a book you have read (BORROWed and RETURNed) you should first write a REVIEW for it!`);
        }

        if (!Object.values(RatingPoints).includes(+ratingPoints.points)) {
            throw new BadRequestException(`Invalid points!`);
        }

        const existingRating = await this.rateRepository.findOne({ where: { bookName: book, madeBy: user }, relations: ['bookName', 'madeBy'] });
        if (existingRating) {
            existingRating.points = ratingPoints.points;
            this.rateRepository.save(existingRating);
            return existingRating;
        }

        else if (!existingRating) {
            const rating = new Rating();
            rating.bookName = book;
            rating.madeBy = user;
            rating.points = ratingPoints.points;

            this.rateRepository.save(rating);
            return rating;
        }

    }

    // ADMIN (CRUD Books)
    // CREATE
    public async addBook(newBook: CreateBookDTO): Promise<BookDTO> {
        const bookToCreate = this.booksRepository.create(newBook);
        const savedBook = await this.booksRepository.save(bookToCreate);
        // return this.transformer.toTodoDTO(savedTodo);
        return savedBook;
    }

    // RETRIEVE -> getBookById

    // UPDATE
    public async updateBook(bookId: number, updateContent: UpdateBookDTO) {
        const oldBook = await this.getBookById(bookId);

        const bookToUpdate = { ...oldBook };
        Object.keys(updateContent).forEach((prop: string) => {
            if ((updateContent as any)[prop] !== undefined) {
                (bookToUpdate as any)[prop] = (updateContent as any)[prop];
            }
        });
        return this.booksRepository.save(bookToUpdate);
    }

    //Delete

    public async deleteBookById(
        bookId: number): Promise<BookDTO> {
        const book = await this.getBookById(bookId);
        book.isDeleted = true;
        this.booksRepository.save(book);
        return book;
    }

}




*/
