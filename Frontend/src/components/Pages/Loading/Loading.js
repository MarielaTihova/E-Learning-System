import React from 'react';
import PropTypes from 'prop-types';

const Loading = ({ children }) => {
  return (
    <div className="lds-dual-ring">
      {children}
    </div>
  )
};

Loading.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Loading;
