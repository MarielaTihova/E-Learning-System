import { ReviewDTO } from '../dtos/reviews/review.dto';
import { UserDTO } from "src/dtos/users/user.dto";
import { User } from "src/models/user.entity";
import { Review } from 'src/models/review.entity';

export class TransformService {
    toUserDTO(user: User): UserDTO {
        return {
            id: user.id,
            username: user.username,
            personalName: user.personalName,
            isDeleted: user.isDeleted,
            avatar: user.avatar,
            registerDate: user.registerDate,
            booksBorrowed: user.booksBorrowed,
            bookReviews: user.bookReviews,
        }
    }

    // export class TransformServiceReview {

    toReviewDTO(review: Review): ReviewDTO {
        return {
            id: review.id,
            text: review.text,
            bookName: review.bookName,
            votes: review.votes,
            madeBy: review.madeBy,
            isDeleted: review.isDeleted,
        }
    }
}


    // toReturnTweetDTO(tweet: Tweet): ReturnTweetDTO {
    //     return {
    //         id: tweet.id,
    //         text: tweet.text,
    //         date: tweet.date,
    //         author: this.toUserDTO(tweet.author),
    //     };
    // }

    // toFollowingsDTO(following: Following): FollowingsDTO {
    //     return {
    //         id: following.id,
    //         date: following.date,
    //         follower: this.toUserDTO(following.follower),
    //         followed: this.toUserDTO(following.followed)
    //     }
    // }

    // toUserWithFollowedUsersDTO(user: User): UserWithFollowedDTO {
    //     console.log(user);

    //     // map():
    //     const followedUsers: UserDTO[] = [];
    //     user.followers.forEach(following => {
    //         const toUserDTO = this.toUserDTO(following.followed);
    //         followedUsers.push(toUserDTO);
    //     });
    //     // return followedUsers

    //     return {
    //         user: this.toUserDTO(user),
    //         followed: followedUsers
    //         //followed: user.followers.map((f: Following) => this.toUserDTO(f.followed))
    //     }
    // }
