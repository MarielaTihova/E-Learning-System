import { Controller, Get, Param, Put, Body, UseGuards } from "@nestjs/common";
import { ReviewReactionsService } from "src/services/review-reactions.service";
import { ReviewReactionDTO } from "src/dtos/review-reactions/create-reaction.dto";
import { UserId } from "src/auth/user-id.decorator";
import { AuthGuard } from "@nestjs/passport";
import { RolesGuard } from "src/auth/roles.guard";
import { BlacklistGuard } from "src/auth/blacklist.guard";

// PRIVATE
// @UseGuards(AuthGuard('jwt'))
@UseGuards(BlacklistGuard)
@Controller('reviews')
export class ReviewReactionsController {
    constructor(
        private readonly reviewReactionsService: ReviewReactionsService
    ) { }

    @Get()
    async allReviews() {
        return await this.reviewReactionsService.allReviews();
    }
    @Get(':id')
    async getReviewById(@Param('id') reviewId: string) {
        return await this.reviewReactionsService.getReviewById(+reviewId);
    }

    @Put(':id/votes')
    async likeReview(@Param('id') reviewId: string, @UserId() userId: number, @Body() vote: ReviewReactionDTO) {
        return this.reviewReactionsService.likeReview(+reviewId, userId, vote);
    }
}