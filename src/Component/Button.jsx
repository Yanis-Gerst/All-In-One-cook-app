import React from "react";

const Button = ({ text, onClick, className, icon, id = "" }) => {
  return (
    <button className={className} onClick={onClick} id={id}>
      {icon && icon()}
      {text}
    </button>
  );
};

export default Button;
