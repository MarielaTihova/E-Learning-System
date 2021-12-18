import React from 'react';
import "./User2.css";
import "../../assets/icons/font-awesome/font-awesome.css";
import PropTypes from 'prop-types';
import Review from '../Books/Reviews/Review';
import Rating from '../Books/Ratings/Rating';
import Book from '../Books/Book/Book';



const User2 = (props) => {
    const user = props.user;
    console.log("User2", user.bookReviews);
    return (

        <div>
            <div class="container1">
                <div class="card1">
                    <img src={user.avatar} alt="Person" class="card__image" />
                    <p class="card__name">{user.username}</p>
                    <div class="grid-container">
                    </div>
                    <ul class="social-icons">
                        <li><a href="#"><i class="fab fa-instagram white-text mr-lg-4"></i></a></li>
                        <li><a href="#"><i class="fab fa-twitter white-text mr-lg-4"></i></a></li>
                        <li><a href="#"><i class="fab fa-linkedin-in white-text mr-lg-4"></i></a></li>
                        <li><a href="#"><i class="fab fa-facebook-f white-text mr-lg-4"></i></a></li>
                    </ul>


                </div>
                <a name="reviews" className="link"></a>

            </div>

        </div>
    )
}

User2.propTypes = {
    user: PropTypes.object.isRequired,
}
export default User2;
