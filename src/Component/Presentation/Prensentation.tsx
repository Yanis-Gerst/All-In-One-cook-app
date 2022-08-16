import Image from "../Image";
import React from "react";
import presentationImg from "../../img/presentation.jpeg";

const Prensentation = () => {
  return (
    <div className="presentation-container">
      <div className="presentation">
        <div className="text-container">
          <h2>Cook Simply</h2>
          <p>Store Recipies easily and know ingredients you have.</p>
        </div>
        <Image imgSrc={presentationImg} />
      </div>
    </div>
  );
};

export default Prensentation;
