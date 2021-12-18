/*import {
    Controller,
    Get,
    Post,
    HttpCode,
    HttpStatus,
    Body,
    Query,
    Param,
    NotFoundException,
    Put,
    Delete,
    UseGuards,
    Patch,
    BadRequestException
} from "@nestjs/common";
import { BooksService } from "src/services/books.service";
import { Book } from "src/models/book.entity";
import { ReviewDTO } from "src/dtos/reviews/review.dto";
import { BookDTO } from "src/dtos/books/book.dto";
import { UpdateBookReviewDTO } from "src/dtos/reviews/update-book-review.dto";
import { UserId } from "src/auth/user-id.decorator";
import { CreateRatingDTO } from "src/dtos/ratings/create-rating.dto";
import { RatingDTO } from "src/dtos/ratings/rating.dto";
import { CreateReviewDTO } from "src/dtos/reviews/create-review.dto";
import { AuthGuard } from "@nestjs/passport";
import { RolesGuard } from "src/auth/roles.guard";
import { CreateBookDTO } from "src/dtos/books/create-book.dto";
import { UpdateBookDTO } from "src/dtos/books/update-book.dto";
import { UserRole } from "src/models/enums/user-role";
import { BlacklistGuard } from "src/auth/blacklist.guard";

@Controller('books')
export class BooksController {
    constructor(
        private readonly booksService: BooksService
    ) { }

    // PRIVATE
    // @UseGuards(AuthGuard('jwt'))
    // @UseGuards(BlacklistGuard)
    // @Get()
    // async getAllBooks(): Promise<BookDTO[]> {
    //     return await this.booksService.getAllBooks();
    // }

    @UseGuards(AuthGuard('jwt'))
    @UseGuards(BlacklistGuard)
    @Get()
    async AllBooksByName(@Query('name') name: string): Promise<BookDTO[]> {
        if (!name) {
            return await this.booksService.getAllBooks();
        }
        else {
            const books = await this.booksService.AllBooksByName(name);
            return books;
        }

    }






    // PRIVATE
    @UseGuards(AuthGuard('jwt'))
    @UseGuards(BlacklistGuard)
    @Get(':id') // GET /books/:id -> /books/5
    async getById(
        @Param('id') id: number
    ): Promise<Book> {
        const book = await this.booksService.getBookById(id);

        if (book === undefined) {
            throw new NotFoundException(`Book with id ${id} does not exist!`)
        }
        return book;
    }

    // PRIVATE
    @UseGuards(AuthGuard('jwt'))
    @Post(':id')
    async borrowABook(@Param('id') bookId: string, @UserId() userId: number): Promise<BookDTO> {
        return this.booksService.borrowABook(+bookId, userId)
    }

    // PRIVATE
    // @UseGuards(AuthGuard('jwt'))
    @UseGuards(BlacklistGuard)
    @Delete(':id')
    async returnBook(@Param('id') bookId: string, @UserId() userId: number) {
        const bookFound = await this.booksService.returnBook(+bookId, userId);
        // if (!bookFound) {
        //     throw new BadRequestException(`CONTROLLER Book with id ${bookId} is already borrowed!`);
        // }

        return bookFound;
    }

    // PRIVATE
    // @UseGuards(AuthGuard('jwt'))
    @UseGuards(BlacklistGuard)
    @Get(':id/reviews')
    @HttpCode(HttpStatus.ACCEPTED)
    async readBookReview(@Param('id') id: string): Promise<ReviewDTO[]> {
        return await this.booksService.readBookReviews(+id);
    }

    // PRIVATE
    // @UseGuards(AuthGuard('jwt'))
    @UseGuards(BlacklistGuard)
    @Get(':id/reviews/:reviewId')
    @HttpCode(HttpStatus.ACCEPTED)
    async getBookReviewById(@Param('id') bookId: string,
        @Param('reviewId') reviewId: string): Promise<ReviewDTO> {
        return await this.booksService.getBookReviewById(+bookId, +reviewId);
    }


    // PRIVATE
    // @UseGuards(AuthGuard('jwt'))
    @UseGuards(BlacklistGuard)
    @Post(':id/reviews')
    @HttpCode(HttpStatus.CREATED)
    async createBookReview(@Body() review: CreateReviewDTO, @Param('id') bookId: string, @UserId() userId: number) {
        return await this.booksService.createBookReview(review, +bookId, userId)
    }

    // PRIVATE
    // @UseGuards(AuthGuard('jwt'))
    @UseGuards(BlacklistGuard)
    @Put(':id/reviews/:reviewId') //  PATCH also works
    async updateReviewById(@Param('id') bookId: string,
        @Param('reviewId') reviewId: string,
        @Body() body: UpdateBookReviewDTO,
        @UserId() userId: number): Promise<ReviewDTO> {
        return await this.booksService.updateReviewById(+bookId, +reviewId, body, userId);
    }

    // PRIVATE
    // @UseGuards(AuthGuard('jwt'))
    @UseGuards(BlacklistGuard)
    @Delete(':id/reviews/:reviewId')
    async deleteReviewById(@Param('id') bookId: string,
        @Param('reviewId') reviewId: string,
        @UserId() userId: number): Promise<ReviewDTO> {
        const review = await this.booksService.deleteReviewById(+bookId, +reviewId, userId);
        // if (review === undefined) {
        //     throw new NotFoundException(`Review NOT yours!`)
        // }

        return review;
    }

    // PRIVATE
    // @UseGuards(AuthGuard('jwt'))
    @UseGuards(BlacklistGuard)
    @Put(':id/rate')
    async rateBook(@Param('id') bookId: string, @UserId() userId: number, @Body() ratingPoints: CreateRatingDTO): Promise<RatingDTO> {
        return await this.booksService.rateBook(+bookId, userId, ratingPoints);
    }

    // ADMIN (CRUD Books)
    // CREATE
    // @UseGuards(AuthGuard('jwt'), new RolesGuard(UserRole.Admin))
    @UseGuards(BlacklistGuard, new RolesGuard(UserRole.Admin))
    @Post()
    async addBook(@Body() book: CreateBookDTO) {
        return await this.booksService.addBook(book);
    }

    // RETRIEVE -> getBookById

    // UPDATE
    // @UseGuards(AuthGuard('jwt'), new RolesGuard(UserRole.Admin))
    @UseGuards(BlacklistGuard, new RolesGuard(UserRole.Admin))
    @Patch(':id')
    public async updateBook(@Param('id') bookId: string, @Body() newContent: UpdateBookDTO) {
        return await this.booksService.updateBook(+bookId, newContent);
    }

    // Delete

    @UseGuards(BlacklistGuard, new RolesGuard(UserRole.Admin))
    @Delete(':id/admin')
    public async deleteBook(@Param('id') bookId: string) {
        return await this.booksService.deleteBookById(+bookId);
    }
}*/
