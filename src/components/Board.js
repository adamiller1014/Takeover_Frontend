import React from 'react';

const Board = ({ children, className }) => {
  return (
    <div className={`bg-[#1C575E] bg-opacity-30 backdrop-blur-md rounded-2xl ${className}`}>
      {children}
    </div>
  );
};

export default Board;