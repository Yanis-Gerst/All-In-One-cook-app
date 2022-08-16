import React from "react";

interface Props {
  imgSrc: string;
}

const Image = ({ imgSrc }) => {
  return (
    <div className="img-container">
      <img src={imgSrc} alt="what you choice to display"></img>
    </div>
  );
};

export default Image;
