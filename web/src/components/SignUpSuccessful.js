import React from 'react';
import PropTypes from 'prop-types';

const SuccessNotification = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className='success-notification'>
      <p>{message}</p>
    </div>
  );
};

SuccessNotification.propTypes = {
  message: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};

export default SuccessNotification;