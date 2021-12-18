import React from 'react';
import "./Review.css";
import Book from '../Book/Book';


const Review = (props) => {
    const review = props.review;
    const deleteReview = props.deleteReview;
    const updateReview = props.updateReview;
    const history = props.history;
    const showAuthor = props.showAuthor;

    return (
        <div id="review">
            <div>
                <h3> For Book: <b> {review.bookName.name} </b></h3>
                <h3 className="review-text"> {review.text}</h3></div>


            {showAuthor === 'true' ?
                <div id="userDetails" >
                    <img src={review.madeBy.avatar} />

                    <p> {review.madeBy.username} </p>
                </div> : null}
        </div>
    )
}

export default Review;