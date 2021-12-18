import { BASE_URL } from "../../../common/constants"
import React, { useEffect, useState, useContext } from 'react'
import Review from "./Review";
import UserContext from "../../../providers/UserContext";
import "./AllReviews.css";
import { MDBBtn } from 'mdbreact';



const AllReviews = (props) => {

    const [answer, setAnswer] = useState(false);
    const [answerForm, showAnswerForm] = useState(false);
    const [currentReviewId, setCurrentReviewId] = useState(0);

    const [reviews, setReviews] = useState([])
    const id = props.match.params['id'];
    const history = props.history;


    const userContext = useContext(UserContext);
    const loggedUser = userContext.user;

    const updateReviewText = (reviewId, value) => {
        const foundReview = reviews.find(r => r.id === reviewId);
        if (!foundReview) {
            return alert(`No review with id ${reviewId} found!`);
        }

        const newReviews = [...reviews];
        newReviews.map((r) => {

            if (r.id === foundReview.id) {
                r.text = value;
            }
            console.log("NEW Reviews: ", newReviews);
            return newReviews;

        })
        setReviews(newReviews);

        console.log("Review To Update: ", foundReview);
    };

    useEffect(() => {
        console.log("ALL REVIEWS");
        fetch(`${BASE_URL}/books/${id}/reviews/`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
            },
        })
            .then((response) => response.json())
            .then((result) => {
                console.log("ALL REVIEWS RESULT", result);
                if ((result.error)) {
                    throw new Error(result.message);
                } else {
                    setReviews(result)
                }
            })
            .catch((error) => alert(error.message))
    }, [])


    const deleteReview = (reviewId) => {
        showAnswerForm(true);
        setCurrentReviewId(reviewId);
        if (!answer) {
            return;
        }
        const foundReview = reviews.find(r => r.id === reviewId);
        if (!foundReview) {
            return alert(`No review with id ${reviewId} found!`);
        }

        else {
            fetch(`${BASE_URL}/books/${id}/reviews/${foundReview.id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
                }
            })
                .then((response) => response.json())
                .then((result) => {
                    console.log("DELETE RESULT", result);
                    if ((result.error)) {
                        throw new Error(result.message);

                    } else {
                        const newReviews = reviews.reduce((newRev, rev) => {
                            if (rev.id !== result.id) {
                                newRev.push(rev);
                            }
                            return newRev;
                        }, []);
                        setReviews(newReviews);
                    }
                })
                .catch((error) => alert(error.message))
                .finally(() => {
                    showAnswerForm(false)
                    setCurrentReviewId(0)
                });
        }
    }


    const updateReview = (reviewId) => {

        const foundReview = reviews.find(r => r.id === reviewId);
        if (!foundReview) {
            return alert(`No review with id ${reviewId} found!`);
        }

        fetch(`${BASE_URL}/books/${id}/reviews/${foundReview.id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
            },
            body: JSON.stringify({ text: foundReview.text }),
        })
            .then((response) => response.json())
            .then((result) => {
                console.log("RESULT", result);
                if ((result.error)) {
                    throw new Error(result.message);

                }
                else {
                    const newReviews = [...reviews];
                    newReviews.map((r) => {

                        if (r.id === foundReview.id) {
                            r = result
                        }

                    })
                    setReviews(newReviews);
                }
            })
            .catch((error) => alert(error.message))
    }



    return (
        <div className="mainDiv">
            <span className="createBtn">
                <MDBBtn outline color="secondary" id="create-review-btn" onClick={() => history.push(`/books/${id}/reviews/create`)}>
                    Create a new review about this book
            </MDBBtn>
                <MDBBtn outline color="secondary" id="create-review-btn" onClick={() => history.goBack()}>
                    Back to book
            </MDBBtn>
            </span>

            {reviews.map((r) => <div >
                <Review review={r} showAuthor={'true'} />

                {r.madeBy.id === loggedUser.id ?
                    <span id="update-review-fields">


                        <label htmlFor="review-text">Edit Text:</label>
                        <input
                            type="text"
                            id="review-text"
                            onChange={(e) => updateReviewText(r.id, e.target.value)}
                            name="review-text"

                        />
                        <MDBBtn color="secondary" onClick={() => { updateReview(r.id) }}> Update Review</MDBBtn> </span> : null}

                {r.madeBy.id === loggedUser.id ?
                    <span className="deleteBtnSpan">
                        <MDBBtn color="secondary" key={r.id} onClick={() => { deleteReview(r.id) }}> Delete Review</MDBBtn> </span> :
                    null}
                {answerForm && r.id === currentReviewId ?
                    <div id="wrapper" >
                        <p>
                            <label for="yes_no_radio">Are you sure you want to delete this review?</label></p>
                        <p id="yes">  <input type="radio" name="joke" value="yes" onChange={() => setAnswer(true)} /> YES</p>
                        <p id="no">  <input type="radio" name="joke" value="no" onChange={() => (setAnswer(false), showAnswerForm(false))} /> NO</p>
                    </div> : null}

            </div>)
            }

        </div >
    )
}

export default AllReviews;
