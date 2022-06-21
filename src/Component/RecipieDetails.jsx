//Icon Import
import { GiCook, GiCookingPot } from "react-icons/gi";
import { AiFillStar, AiOutlineStar, AiFillMinusCircle } from "react-icons/ai";
import { IoChevronBackOutline } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { BsPlusCircleFill, BsTag } from "react-icons/bs";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { RecipiesContext } from "./Recipies";
import { useUserContext } from "../App";
import useCounter from "../CustomHook/useCounter";

import Button from "./Button";
import IngredientDetails from "./IngredientDetails";
import NutrionalsValue from "./NutrionalsValue";
import CookRecipie from "./CookRecipie";

const RecipieDetails = ({ recipie, toClose }) => {
  const user = useUserContext();
  const [currentRecipie, setCurrentRecipie] = useState({ ...recipie });
  const [nbPerson, counterNbPerson] = useCounter(1, 1);

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

  const handleDoIt = () => {
    const recipieIngredients = { ...currentRecipie.ingredients };
    const recIngNames = Object.values(recipieIngredients).map((value) =>
      value.name.toLowerCase()
    );
    //Verif Step
    const userIngNames = Object.values(user.data.ingredients).map((value) =>
      value.name.toLowerCase()
    );
    if (!recIngNames.every((recName) => userIngNames.includes(recName))) {
      return;
    }

    const userIng = { ...user.data.ingredients };
    Object.keys(userIng).map((key) => {
      let value = userIng[key];
      Object.keys(recipieIngredients).map((recIngKey) => {
        let recValueIng = recipieIngredients[recIngKey];
        if (recValueIng.name.toLowerCase() === value.name.toLowerCase()) {
          value.quantity -= recValueIng.quantity;
        }
      });
    });
    user.setData({ ...user.data, ingredients: userIng });
  };

  // const increment = () => {
  //   setNbPerson((nb) => nb + 1);
  // };

  // const decrement = () => {
  //   if (nbPerson <= 1) return;
  //   setNbPerson((nb) => nb - 1);
  // };

  return (
    <>
      <div className="rec-detail-container">
        <div className="rec-detail-header">
          <IoChevronBackOutline
            onClick={toClose}
            style={{ cursor: "pointer" }}
          />
          <Button
            text="Delete"
            className="btn-delete"
            onClick={() => onDelete(recipie)}
            icon={() => <MdDelete />}
          />
        </div>

        <div className="rec-info">
          <h2
            className="rec-name"
            suppressContentEditableWarning={true}
            contentEditable
            data-name="name"
            onBlur={onSubmit}
            onKeyPress={handleInput}
          >
            {currentRecipie.name}
          </h2>
          <div className="rec-wrapper">
            <GiCookingPot />
            <p
              className="rec-prep"
              suppressContentEditableWarning={true}
              contentEditable
              data-name="prepTime"
              onBlur={onSubmit}
              onKeyPress={handleInput}
            >
              {recipie.prepTime}
            </p>
          </div>
          <div className="rec-wrapper">
            <GiCook />
            <p
              className="rec-cooking-time"
              suppressContentEditableWarning={true}
              contentEditable
              data-name="cookTime"
              onBlur={onSubmit}
              onKeyPress={handleInput}
            >
              {recipie.cookTime}
            </p>
          </div>
          <p
            className="rec-desc"
            suppressContentEditableWarning={true}
            contentEditable
            data-name="desc"
            onBlur={onSubmit}
            onKeyPress={handleInput}
          >
            {recipie.desc}
          </p>
          <div className="rec-note">
            {[...new Array(5)].map((value, index) => {
              if (index + 1 > recipie.difficulty)
                return <AiOutlineStar key={index} />;
              return <AiFillStar key={index} />;
            })}
          </div>

          <div className="rec-wrapper">
            <BsTag />
            <p
              suppressContentEditableWarning={true}
              contentEditable
              data-name="tag"
              onBlur={onSubmit}
              onKeyPress={handleInput}
            >
              {recipie.tag ? recipie.tag : "noTag"}
            </p>
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
          <p
            suppressContentEditableWarning={true}
            contentEditable
            name="process"
            onBlur={onSubmit}
            onKeyPress={handleInput}
          >
            {recipie.process}
          </p>
          <NutrionalsValue ingredients={ingredients} nbPerson={nbPerson} />

          <CookRecipie currentRecipie={currentRecipie} />
        </div>
      </div>
    </>
  );
};

export default RecipieDetails;
