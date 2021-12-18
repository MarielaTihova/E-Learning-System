import React, { useState, useEffect, useContext } from 'react';
import { BASE_URL } from '../../../common/constants';
import Book from '../Book/Book';
import Rating from '../Ratings/Rating';
import AppError from '../../Pages/AppError/AppError';
import Review from '../Reviews/Review';
import "./SingleBook.css";
import UserContext from '../../../providers/UserContext';
import CreateReview from '../Reviews/CreateReview';
import { MDBBtn, MDBView } from 'mdbreact';
import { Row, Col, Container } from 'react-bootstrap'

const SingleBook = (props) => {
    const id = props.match.params['id'];
    let inputText = { text: '' };
    const history = props.history;

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [ratings, setRatings] = useState(false);
    const [appBook, updateBook] = useState({
        id: 1,
        name: "",
        author: "",
        borrower: null,
        isDeleted: false,
        wasBorrowedBy: [],
        poster: "",
        ratings: [],
        reviews: [],
        summary: "",

    });
    const [bookReviews, setBookReviews] = useState(appBook.reviews);

    const userContext = useContext(UserContext);
    const loggedUser = userContext.user;


    const [review, removeReview] = useState(false);
    useEffect(() => {
        fetch(`${BASE_URL}/books/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
            }
        })
            .then((response) => response.json())
            .then((result) => {
                if ((result.error)) {
                    throw new Error(result.message);

                } else {
                    updateBook(result);
                }
            })
            .catch((error) => setError(error.message))
    }, [id]);




    const averageRating = () => {
        if (!appBook.ratings) {
            return 0;
        }

        let sum = appBook.ratings.reduce((acc, rating) => {
            acc += rating.points;
            return acc;
        }, 0);

        const avgRating = sum / appBook.ratings.length;
        return avgRating;
    }

    const avg = averageRating();
    const avRating = avg.toFixed(2);

    const numberReviews = () => {
        const bookReviews = [];
        appBook.reviews.forEach(review => {
            if (review.isDeleted === false) {
                bookReviews.push(review);
            }
        })

        return bookReviews;
    }

    const numberOfReviews = numberReviews().length;

    if (error) {
        return (
            <div>

                <AppError message={error} />

            </div>
        );
    }

    let pointsOne = [];
    let pointsTwo = [];
    let pointsThree = [];
    let pointsFour = [];
    let pointsFive = [];

    const pointsCategoriesDistribution = () => {
        appBook.ratings.forEach(rating => {
            console.log("rat pts", rating.points);
            if (rating.points === 1) {
                console.log("ONE");
                pointsOne.push(rating);
            }
            if (rating.points === 2) {
                pointsTwo.push(rating);
            }
            if (rating.points === 3) {
                pointsThree.push(rating);
            }
            if (rating.points === 4) {
                console.log("FOUR");
                pointsFour.push(rating);
            }
            if (rating.points === 5) {
                pointsFive.push(rating);
            }
        })
    }

    pointsCategoriesDistribution();
    console.log("pointsOne", pointsFour);

    return (
        <div className="background-img">
            {/*<Book book={appBook} />*/}

            <div className="single-book">

                <div>
                    <img id="book-poster"
                        src={appBook.poster} height="500px" width="350px"
                    />
                </div>
                <div id="book-details">
                    <h2 id="book-name">{appBook.name}</h2>
                    <h3> Author: {appBook.author}</h3>
                    <ul>
                        <li> <p> <b><u>Summary:</u> </b>{appBook.summary} </p></li>
                        <li>
                            {avg ? <p><b>Avg rating: </b>{avRating}/5</p> : <p><b>Avg rating: </b>No ratings yet</p>}</li>
                        <li><p> Read by <b>{appBook.wasBorrowedBy.length}</b> users</p></li>
                        <li> <p>
                            Available to borrow: <b>{appBook.borrower ? 'No' : 'Yes'}</b></p>
                        </li>
                        <li>
                            Reviews: <b>{numberOfReviews}</b>
                        </li>
                    </ul>




                    <span className="view-review"> <MDBBtn className="button" color="secondary" onClick={() => history.push(`/books/${appBook.id}/reviews`)}>
                        View Reviews
                     </MDBBtn>
                        <MDBBtn className="button" color="secondary" onClick={() => { setRatings(!ratings) }} >
                            {ratings ? 'Hide Ratings' : 'View Ratings'}
                        </MDBBtn>
                    </span>

                </div>

            </div>

            {ratings ? <div id="ratings-intro"> All ratings sorted by number of points </div> : null}
            {
                ratings ? <div id="rating-points-categories">

                    <p>{pointsOne.map(r => <Rating key={r.id} rating={r} />)}</p>
                    <p>{pointsTwo.map(r => <Rating key={r.id} rating={r} />)}</p>
                    <p>{pointsThree.map(r => <Rating key={r.id} rating={r} />)}</p>
                    <p>{pointsFour.map(r => <Rating key={r.id} rating={r} />)}</p>
                    <p>{pointsFive.map(r => <Rating key={r.id} rating={r} />)}</p>
                </div> : null
            }
        </div >
    )
}

export default SingleBook;