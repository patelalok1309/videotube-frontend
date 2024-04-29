import React from 'react';
import { BsArrowRepeat } from 'react-icons/bs';

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center">
      <BsArrowRepeat className="animate-spin text-blue-500 mr-2" size={24} />
      <span className="text-white">Loading...</span>
    </div>
  );
};

export default LoadingSpinner;
