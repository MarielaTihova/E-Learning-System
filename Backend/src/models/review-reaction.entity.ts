import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from "typeorm";
import { User } from "./user.entity";
import { Review } from "./review.entity";
import { ReactionType } from "./enums/reaction-type";

@Entity('review_reactions')
export class ReviewReaction { //Vote
    @PrimaryGeneratedColumn()
    id: number;

    // who reacted to the review
    @ManyToOne(() => User, user => user.bookVotes, { onDelete: "CASCADE" })
    madeBy: User // madeby

    // what review was liked/disliked
    @ManyToOne(() => Review, rev => rev.votes, { onDelete: "CASCADE" })
    reviewVotedFor: Review;
    // (from body): Reaction assigned{ like, dislike, love, care, cry, wow }
    @Column()
    reactionType: ReactionType; // like

}