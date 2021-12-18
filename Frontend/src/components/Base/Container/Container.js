import React from 'react';
import PropTypes from 'prop-types';
import './Container.css';

const Container = ({ children }) => {

  return (
    <div className="Container">
      {children}
    </div>
  )
};

Container.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default Container;
