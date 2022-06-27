import { GiCook, GiCookingPot } from "react-icons/gi";
import { AiFillStar } from "react-icons/ai";
import useToogle from "../CustomHook/useToogle";
import Modale from "./Modale";
import RecipieDetails from "./RecipieDetails";
import { arrowNaviguation } from "./Recipies";
const Recipie = ({ recipie, index }) => {
  const [showDetail, toogleShowDetail] = useToogle(false);

  const handleArrowShortCut = arrowNaviguation(".rec", index);

  const handleKeyShortcut = (e) => {
    handleArrowShortCut();
    if (e.key === "Enter") {
      toogleShowDetail();
    }
  };
  return (
    <div
      className="rec"
      onClick={showDetail ? null : toogleShowDetail}
      tabIndex="0"
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
        {recipie.urlImage && (
          <img rel="preload" as="image" src={recipie.urlImage} />
        )}
      </div>

      <p className="rec-desc">{recipie.desc}</p>
      {showDetail && (
        <Modale toClose={toogleShowDetail}>
          <RecipieDetails recipie={recipie} />
        </Modale>
      )}
    </div>
  );
};

export default Recipie;
