// src/components/common/Input.js

import React from 'react';

const Input = ({ type, placeholder, value, onChange, required, className }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      className={`form-control mb-3 ${className}`}
      style={{ maxWidth: '50%' }} // Ensure the input doesn't exceed the container width
    />
  );
};

export default Input;
