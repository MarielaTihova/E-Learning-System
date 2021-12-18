import { Injectable, BadRequestException } from "@nestjs/common";
import { TransformService } from "./transform.service";
import { InjectRepository } from "@nestjs/typeorm";
import { Book } from "src/models/book.entity";
import { Repository } from "typeorm";
import { Review } from "src/models/review.entity";
import { ReviewReaction } from "src/models/review-reaction.entity";
import { Rating } from "src/models/rating.entity";
import { UsersService } from "./users.service";
import { BooksService } from "./books.service";
import { ReviewReactionDTO } from "src/dtos/review-reactions/create-reaction.dto";
import { ReactionType } from "src/models/enums/reaction-type";

@Injectable()
export class ReviewReactionsService {
    constructor(
        private readonly transformer: TransformService,
        @InjectRepository(Book) private readonly booksRepository: Repository<Book>,
        @InjectRepository(Review) private readonly reviewsRepository: Repository<Review>,
        @InjectRepository(ReviewReaction) private readonly reviewReactionRepositoy: Repository<ReviewReaction>,
        @InjectRepository(Rating) private readonly rateRepository: Repository<Rating>,
        private readonly usersService: UsersService,
        private readonly booksService: BooksService
    ) { }

    // async allReviews() {
    //     return await this.reviewReactionRepositoy.find({
    //         relations: ['madeBy',
    //             'reviewVotedFor', 'reviewVotedFor.bookName', 'reviewVotedFor.votes']
    //     });
    // }

    async allReviews() {
        return await this.reviewsRepository.find({
            where: { isDeleted: false },
            relations: ['bookName', 'madeBy', 'votes']
        });
    }

    async getReviewById(reviewId: number) {
        const reviewFound = await this.reviewsRepository.findOne({
            where: { id: reviewId, isDeleted: false },
            relations: ['bookName', 'madeBy', 'votes', 'votes.madeBy']
        });

        if (!reviewFound) {
            throw new BadRequestException(`Review with id ${reviewId} does not exist!`);
        }

        return reviewFound;
    }
    async likeReview(reviewId: number, userId: number, vote: ReviewReactionDTO): Promise<ReviewReactionDTO> {
        const review = await this.getReviewById(reviewId);
        const user = await this.usersService.getUserById(userId);
        const voteByUser = review.votes.find(vote => vote.madeBy.id === user.id);

        if (!Object.values(ReactionType).includes(+vote.reactionType)) {
            throw new BadRequestException(`Invalid reaction!`);
        }
        if (!voteByUser) {
            // update vote
            const createVote = await this.reviewReactionRepositoy.create(vote);
            createVote.madeBy = user;
            createVote.reviewVotedFor = review;
            const voteCreated = await this.reviewReactionRepositoy.save(createVote);

            return voteCreated;
        }

        else if (voteByUser) {
            voteByUser.reactionType = vote.reactionType;
            this.reviewReactionRepositoy.save(voteByUser);

            return voteByUser;
        }



    }
}