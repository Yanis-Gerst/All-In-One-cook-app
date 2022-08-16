import React from "react";
import { IoIosClose } from "react-icons/io";

interface Props {
  onClick: () => void;
  label: string;
}
const IconButton = ({ onClick, label = "" }: Props) => {
  return (
    <button className="icon-button" onClick={onClick} aria-label={label}>
      <IoIosClose />
    </button>
  );
};

export default IconButton;
