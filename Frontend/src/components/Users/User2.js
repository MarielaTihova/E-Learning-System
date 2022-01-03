import React from 'react';
import "./User2.css";
import "../../assets/icons/font-awesome/font-awesome.css";
import PropTypes from 'prop-types';

const User2 = (props) => {
    const user = props.user;
    console.log("User2", user);
    return (
        <div>
            <div className="container1">
                <div className="card1">
                    <div className="card2">
                        <h2>Your profile information</h2>
                        <div className="element">
                            <p className="card__name">User name:</p>
                            <div>{user.username}</div>
                        </div>
                        <div className="element">
                            <p className="card__name">Personal name:</p>
                            <div>{user.personalName}</div>
                        </div>
                        <div className="grid-container">
                        </div>
                        <ul className="social-icons">
                            <li><a href="#"><i className="fab fa-instagram white-text mr-lg-4"></i></a></li>
                            <li><a href="#"><i className="fab fa-twitter white-text mr-lg-4"></i></a></li>
                            <li><a href="#"><i className="fab fa-linkedin-in white-text mr-lg-4"></i></a></li>
                            <li><a href="#"><i className="fab fa-facebook-f white-text mr-lg-4"></i></a></li>
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
