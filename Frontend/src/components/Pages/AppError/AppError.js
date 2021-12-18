import React from 'react';
import PropTypes from 'prop-types';
import './AppError.css';

const AppError = ({ message }) => {

  return (
    <div className="AppError">
      <h1>{message}</h1>
      <img src="https://media3.giphy.com/media/4cQSQYz0a9x9S/giphy.gif?cid=ecf05e4782am5cgdn7d4mkzdmxwbgmf7e5f7mqo4pv4wc1u7&rid=giphy.gif"></img>
    </div>
  )
};

AppError.propTypes = {
  message: PropTypes.string.isRequired,
};

export default AppError;
