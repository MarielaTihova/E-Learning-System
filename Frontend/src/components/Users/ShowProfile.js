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
        // bookRatings: [],
        // bookReviews: [],
        avatar: "",
        // booksBorrowed: [],
        // booksBorrowedHistory: [],
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
        </div >
    )
};



export default ShowProfile;
