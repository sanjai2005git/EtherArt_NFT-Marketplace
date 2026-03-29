import React from "react";

const Button = ({ className, text, onClick }) => {
  return (
    <div
      className={` text-white font-semibold rounded-lg text-center cursor-pointer flex justify-center items-center ${className} glass-button`}
      onClick={onClick}
    >
      {text}
    </div>
  );
};

export default Button;
