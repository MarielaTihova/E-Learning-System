import React from 'react';
import "./User2.css";
import "../../assets/icons/font-awesome/font-awesome.css";
import PropTypes from 'prop-types';

const User2 = (props) => {
    const user = props.user;
    console.log("User2", user);
    return (
        <div>
            <div class="container1">
                <div class="card1">
                    <div class="card2">
                    <h2>Your profile information</h2>
                            <div class="element">
                                <p class="card__name">User name:</p>
                                <div>{user.username}</div>
                            </div>
                            <div class="element">
                                <p class="card__name">Personal name:</p>
                                <div>{user.personalName}</div>
                            </div>
                            <div class="grid-container">
                            </div>
                            <ul class="social-icons">
                                <li><a href="#"><i class="fab fa-instagram white-text mr-lg-4"></i></a></li>
                                <li><a href="#"><i class="fab fa-twitter white-text mr-lg-4"></i></a></li>
                                <li><a href="#"><i class="fab fa-linkedin-in white-text mr-lg-4"></i></a></li>
                                <li><a href="#"><i class="fab fa-facebook-f white-text mr-lg-4"></i></a></li>
                            </ul>
                        </div>
                    </div>
                </div>

        </div>
    )
}

User2.propTypes = {
    user: PropTypes.object.isRequired,
}
export default User2;
