import React from "react";

export interface Props {
  text?: string;
  onClick: (e?: React.MouseEvent) => void;
  className?: string;
  icon?: () => React.ReactElement;
  id?: string;
}
const Button = ({ text, onClick, className, icon, id = "" }: Props) => {
  return (
    <button className={className} onClick={onClick} id={id}>
      {icon && icon()}
      {text}
    </button>
  );
};

export default Button;
