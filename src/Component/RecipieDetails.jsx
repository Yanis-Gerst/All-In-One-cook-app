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
import { useCallback } from "react";

import Button from "./Button";
import IngredientDetails from "./IngredientDetails";

const getSameIngredient = (userIngredients, ingredient) => {
  const sameIngredient = Object.values(userIngredients).filter((userIng) => {
    return userIng.name.toLowerCase() === ingredient.name.toLowerCase();
  });
  return sameIngredient;
};

const RecipieDetails = ({ recipie, toClose }) => {
  const user = useUserContext();
  const [currentRecipie, setCurrentRecipie] = useState({ ...recipie });
  const [nbPerson, setNbPerson] = useState(1);

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
      console.log("T'as pas les ingrédients");
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

  const increment = () => {
    setNbPerson((nb) => nb + 1);
  };

  const decrement = () => {
    if (nbPerson <= 1) return;
    setNbPerson((nb) => nb - 1);
  };

  //Futur Nutrionals Value Component

  const allUserIngredients = useCallback(
    Object.values(ingredients).map((ing) => {
      return {
        ...getSameIngredient(user.data.ingredients, ing)[0],
        currentQuantity: ing.quantity,
      };
    }),
    [ingredients, user.data.ingredient]
  );
  const nutrionalsIsNotDefine = allUserIngredients.some(
    (userIng) => typeof userIng.nutrionals === "undefined"
  );

  let recNutrionalsValue;
  if (!nutrionalsIsNotDefine) {
    recNutrionalsValue = allUserIngredients.reduce(
      (prev, curr) => {
        if (!curr.nutrionals) return prev;
        const forQuantity = curr.nutrionals.quantity;
        const coef = (curr.currentQuantity * nbPerson) / forQuantity;
        return {
          prot: Number(prev.prot) + Number(curr.nutrionals.prot) * coef,
          lipide: Number(prev.lipide) + Number(curr.nutrionals.lipide) * coef,
        };
      },
      { prot: 0, lipide: 0 }
    );
  }

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
            <AiFillMinusCircle onClick={decrement} />
            <p>{nbPerson} Personne</p>
            <BsPlusCircleFill onClick={increment} />
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
          {recNutrionalsValue ? (
            <div className="nutrionals-value">
              <h4>Valeur nutrionelle</h4>
              <ul>
                <li>Protéine: {recNutrionalsValue?.prot}g</li>
                <li>Lipide: {recNutrionalsValue?.lipide}g</li>
              </ul>
            </div>
          ) : (
            <p>On a pas les infos sur tous les ingrédients</p>
          )}

          <Button text="Do It" onClick={handleDoIt} />
        </div>
      </div>
    </>
  );
};

export default RecipieDetails;
