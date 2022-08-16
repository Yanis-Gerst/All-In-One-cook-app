import { GiCook, GiCookingPot } from "react-icons/gi";
import { AiFillStar } from "react-icons/ai";
import useToogle from "../../CustomHook/useToogle";
import Modale from "../Modal";
import RecipeDetails from "./RecipeDetails";
import { IRecipe } from "../../Interface/userData";
import React from "react";

interface Props {
  recipie: IRecipe;
  index?: number;
}

const Recipe = ({ recipie, index }: Props) => {
  const [showDetail, toogleShowDetail] = useToogle(false);

  const handleKeyShortcut = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      toogleShowDetail();
    }
  };
  return (
    <div
      className="rec"
      onClick={showDetail ? () => {} : toogleShowDetail}
      tabIndex={0}
      aria-label={`your recipie ${recipie.name}`}
      onKeyDown={handleKeyShortcut}
    >
      <h2 className="rec-name">{recipie.name}</h2>
      <div className="rec-info">
        <p className="rec-prep">
          <GiCookingPot /> {recipie.prepTime}
        </p>
        <p className="rec-cooking-time">
          <GiCook /> {recipie.cookTime}
        </p>
        <div className="rec-note">
          {recipie.difficulty} <AiFillStar />
        </div>
      </div>
      <div className="rec-img-container">
        {recipie.urlImage && <img src={recipie.urlImage} alt={recipie.name} />}
      </div>

      <p className="rec-desc">{recipie.desc}</p>
      {showDetail && (
        <Modale toClose={toogleShowDetail}>
          <RecipeDetails recipie={recipie} />
        </Modale>
      )}
    </div>
  );
};

export default Recipe;
