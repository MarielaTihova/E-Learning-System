import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { BASE_URL } from '../../common/constants';
import UserContext from '../../providers/UserContext';
import Rating from '../Books/Ratings/Rating';
import './User2.css';
import Book from '../Books/Book/Book';
import User2 from './User2';
import Review from '../Books/Reviews/Review';
import "./ShowProfile.css"


const ShowProfile = (props) => {
    const id = props.match.params['id'];
    const path = props.location.pathname;
    console.log("props", props);
    const [appUser, setUser] = useState({
        id: 1,
        username: "",
        personalName: "",
        bookRatings: [],
        bookReviews: [],
        avatar: "",
        booksBorrowed: [],
        booksBorrowedHistory: [],
    });



    const userContext = useContext(UserContext);
    const loggedUser = userContext.user;

    useEffect(() => {

        fetch(`${BASE_URL}/users/${loggedUser.id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
            }
        })
            .then((response) => response.json())
            .then((result) => {
                console.log("request: ", result);
                if ((result.error)) {
                    throw new Error(result.message);

                } else {
                    setUser(result);
                }
            })
            .catch((error) => console.log(error.message))
    }, [id]);



    return (
        <div className="ShowProfile">
            <User2 user={appUser} />
            <h3>Ratings: <div className="profile-ratings">{appUser.bookRatings.map(r =>
                <div >
                    <p>Points: <b>{r.points}</b></p>
                    <p>For book: <b>{r.bookName.name}</b></p>
                    <img height="350px" width="250px" src={r.bookName.poster} />
                </div>

            )}</div></h3>


            <h3>Books borrowed at the moment:<div className="booksBorrowed">{appUser.booksBorrowed ? <h2> {appUser.booksBorrowed.map(b =>
                <Book book={b} />
            )}</h2> : null}</div></h3>



        </div >
    )
};



export default ShowProfile;
