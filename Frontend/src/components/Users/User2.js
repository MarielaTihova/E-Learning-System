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

                        <div class="grid-child-posts">
                            {user.bookReviews.length} Reviews
      </div>

                        <div class="grid-child-followers">
                            {user.booksBorrowedHistory.length} Books read
      </div>

                    </div>
                    <ul class="social-icons">
                        <li><a href="#"><i class="fab fa-instagram white-text mr-lg-4"></i></a></li>
                        <li><a href="#"><i class="fab fa-twitter white-text mr-lg-4"></i></a></li>
                        <li><a href="#"><i class="fab fa-linkedin-in white-text mr-lg-4"></i></a></li>
                        <li><a href="#"><i class="fab fa-facebook-f white-text mr-lg-4"></i></a></li>
                    </ul>
                    <button class="btn1 draw-border"><a href="#reviews">Reviews</a></button>
                    <button class="btn1 draw-border"><a href="#booksRead">Books read</a></button>





                </div>
                <a name="reviews" className="link"></a>
                <p id="user-rev"> User reviews:</p>

                {user.bookReviews.map(r => <div> <Review review={r} showAuthor={'true'} />
                </div>)}


                <a name="booksRead" className="link">
                    <h3>Books read:<div className="profile-booksBorrowedhistory">{user.booksBorrowedHistory ? <div ><h3> {user.booksBorrowedHistory.map(b =>
                        <Book book={b} />
                    )}</h3></div> : null}</div></h3></a>
            </div>

        </div>
    )
}

User2.propTypes = {
    user: PropTypes.object.isRequired,
}
export default User2;