import React from "react";

interface Props {
  children: React.ReactNode;
}

const DropDownItem = ({ children }: Props) => {
  return <div className="dropdown-item">{children}</div>;
};

export default DropDownItem;
