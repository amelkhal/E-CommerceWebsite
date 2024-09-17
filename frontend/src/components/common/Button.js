import React from 'react';

const Button = ({ type = 'button', className, children, ...props }) => {
  return (
    <button type={type} className={`btn btn-primary ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
