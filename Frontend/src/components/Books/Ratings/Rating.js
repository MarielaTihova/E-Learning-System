import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Rating.css';

const Rating = (props) => {
    const rating = props.rating;

    return (
        <div id="rating">
            <div id="big-number-points"> {rating.points}</div>
            <div id="userInfo" >
                <img src={rating.madeBy.avatar} />
                <p>{rating.madeBy.username}</p>
            </div>
        </div >
    )
};


Rating.propTypes = {
    rating: PropTypes.object.isRequired,
}
export default Rating;
