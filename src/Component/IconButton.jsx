import React from "react";
import { IoIosClose } from "react-icons/io";

const IconButton = ({ onClick, label = "" }) => {
  return (
    <button className="icon-button" onClick={onClick} aria-label={label}>
      <IoIosClose />
    </button>
  );
};

export default IconButton;
