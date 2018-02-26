import React from 'react';
import PropTypes from 'prop-types';

const LoadingComponent = ({ isLoading, error }) => {
  if (isLoading) {
    return <div>Loadding...</div>;
  } else if (error) {
    // Handle the error state
    return <div>Sorry, there was a problem loading the page.</div>;
  }
  return null;
};

LoadingComponent.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.object,
};

LoadingComponent.defaultProps = {
  error: null,
};

export default LoadingComponent;
