//Icon Import
import { GiCook, GiCookingPot } from "react-icons/gi";
import { AiFillStar, AiOutlineStar, AiFillMinusCircle } from "react-icons/ai";
import { IoChevronBackOutline } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { BsPlusCircleFill, BsTag } from "react-icons/bs";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { RecipiesContext } from "./Recipies";
import { useUserContext } from "../App";
import useCounter from "../CustomHook/useCounter";
import Button from "./Button";
import IngredientDetails from "./IngredientDetails";
import NutrionalsValue from "./NutrionalsValue";
import CookRecipie from "./CookRecipie";
import ContentEditable from "./ContentEditable";
import DropDown from "./DropDown";
import DropDownItem from "./DropDownItem";

const RecipieDetails = ({ recipie, toClose }) => {
  const user = useUserContext();
  const [currentRecipie, setCurrentRecipie] = useState({ ...recipie });
  const [nbPerson, counterNbPerson] = useCounter(1, 1);
  console.log(currentRecipie);
  const recipies = useContext(RecipiesContext);
  const ingredients = recipie.ingredients;

  const onDelete = (recipie) => {
    recipies.delete(recipie);
    toClose();
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const attrName = e.target.getAttribute("data-name");
    setCurrentRecipie({
      ...currentRecipie,
      [attrName]: e.target.textContent,
    });
  };

  useEffect(() => {
    recipies.update({ ...currentRecipie });
  }, [currentRecipie]);

  const handleInput = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.target.blur();
    }
  };

  const handleManualNutr = (e) => {
    setCurrentRecipie({
      ...currentRecipie,
      manualNutr: {
        ...currentRecipie.manualNutr,
        [e.target.name]: e.target.value,
      },
    });
  };

  return (
    <>
      <div className="rec-detail-container">
        <div className="rec-detail-header">
          <IoChevronBackOutline
            onClick={toClose}
            style={{ cursor: "pointer" }}
          />
          <DropDown title={<BsThreeDotsVertical />}>
            <h3>Def manuelle</h3>
            <DropDownItem>
              <div className="dropdown-control">
                <label>Calories</label>
                <input
                  type="number"
                  name="calorie"
                  value={currentRecipie.manualNutr?.calorie || ""}
                  onChange={handleManualNutr}
                ></input>
              </div>
            </DropDownItem>
            <DropDownItem>
              <div className="dropdown-control">
                <label>Proteine</label>
                <input
                  type="number"
                  name="proteine"
                  value={currentRecipie.manualNutr?.proteine || ""}
                  onChange={handleManualNutr}
                ></input>
              </div>
            </DropDownItem>
            <DropDownItem>
              <div className="dropdown-control">
                <label>Lipide</label>
                <input
                  type="number"
                  name="lipide"
                  value={currentRecipie.manualNutr?.lipide || ""}
                  onChange={handleManualNutr}
                ></input>
              </div>
            </DropDownItem>
          </DropDown>
          <Button
            text="Delete"
            className="btn-delete"
            onClick={() => onDelete(recipie)}
            icon={() => <MdDelete />}
          />
        </div>

        <div className="rec-info">
          <ContentEditable
            className="rec-name"
            data="name"
            onBlur={onSubmit}
            onKeyPress={handleInput}
            tagName="h2"
          >
            {currentRecipie.name}
          </ContentEditable>

          <div className="rec-wrapper">
            <GiCookingPot />
            <ContentEditable
              className="rec-prep"
              data="prepTime"
              onBlur={onSubmit}
              onKeyPress={handleInput}
            >
              {recipie.prepTime}
            </ContentEditable>
          </div>
          <div className="rec-wrapper">
            <GiCook />
            <ContentEditable
              className="rec-cooking-time"
              data="cookTime"
              onBlur={onSubmit}
              onKeyPress={handleInput}
            >
              {recipie.cookTime}
            </ContentEditable>
          </div>
          <ContentEditable
            className="rec-desc"
            data="desc"
            onBlur={onSubmit}
            onKeyPress={handleInput}
          >
            {recipie.desc}
          </ContentEditable>

          <div className="rec-note">
            {[...new Array(5)].map((value, index) => {
              if (index + 1 > recipie.difficulty)
                return <AiOutlineStar key={index} />;
              return <AiFillStar key={index} />;
            })}
          </div>

          <div className="rec-wrapper">
            <BsTag />
            <ContentEditable
              data-name="tag"
              onBlur={onSubmit}
              onKeyPress={handleInput}
            >
              {recipie.tag ? recipie.tag : "noTag"}
            </ContentEditable>
          </div>
        </div>

        <div className="rec-img-container">
          {recipie.urlImage && (
            <img src={recipie.urlImage} className="rec-img" />
          )}
        </div>

        <div className="rec-ingredient-container">
          <h4>Ingredient List:</h4>

          {Object.keys(ingredients).map((key) => (
            <IngredientDetails
              key={key}
              ingredient={ingredients[key]}
              nbPerson={nbPerson}
            />
          ))}

          <div className="counter-container">
            <AiFillMinusCircle onClick={counterNbPerson.decrement} />
            <p>{nbPerson} Personne</p>
            <BsPlusCircleFill onClick={counterNbPerson.increment} />
          </div>
        </div>

        <div className="rec-process">
          <h4>Etape:</h4>
          <ContentEditable
            data="process"
            onBlur={onSubmit}
            onKeyPress={handleInput}
            tagName="p"
          >
            {recipie.process}
          </ContentEditable>

          <NutrionalsValue ingredients={ingredients} nbPerson={nbPerson} />

          <CookRecipie currentRecipie={currentRecipie} />
        </div>
      </div>
    </>
  );
};

export default RecipieDetails;
