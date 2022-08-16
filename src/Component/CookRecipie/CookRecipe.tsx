import React from "react";
import { useUserContext } from "../../App";
import { useState } from "react";
import Button from "../Button";
import { IIngredients, IIngredient } from "../../Interface/userData";

const CookRecipe = ({ currentRecipie }) => {
  const [error, setError] = useState(false);
  const [isCook, setIsCook] = useState(false);
  const [notEnoughIng, setNotEnoughIng] = useState(false);
  const user = useUserContext();

  const handleDoIt = () => {
    const recipieIngredients: IIngredients = { ...currentRecipie.ingredients };
    const recIngNames = Object.values(recipieIngredients).map(
      (value: IIngredient) => value.name.toLowerCase()
    );
    //Verif Step
    const userIngNames = Object.values(user.data.ingredients).map(
      (value: IIngredient) => value.name.toLowerCase()
    );
    //On verifie qu'on possède tous les ingrédients
    if (!recIngNames.every((recName) => userIngNames.includes(recName))) {
      setError(true);
      return;
    }
    let notEnough;
    const userIng = { ...user.data.ingredients };
    Object.keys(userIng).forEach((key) => {
      let value = userIng[key];
      Object.keys(recipieIngredients).forEach((recIngKey) => {
        let recValueIng = recipieIngredients[recIngKey];
        if (recValueIng.name.toLowerCase() === value.name.toLowerCase()) {
          if (notEnough) return;
          if (value.quantity < recValueIng.quantity) {
            setNotEnoughIng(true);
            notEnough = true;
            return;
          }
          value.quantity -= recValueIng.quantity;
        }
      });
    });
    user.setData({ ...user.data, ingredients: userIng });

    if (!notEnough) {
      setIsCook(true);
    }

    setTimeout(() => {
      setIsCook(false);
    }, 2000);
  };
  return (
    <>
      <Button text="Cook It" onClick={handleDoIt} />
      {error && <p>T'as pas assez d'ingrédients dans le frigo</p>}
      {isCook && <p>C'est partie tes ingrédients on été utilisé</p>}
      {notEnoughIng && <p>T'as pas assez d'ingrédients en terme de quantité</p>}
    </>
  );
};

export default CookRecipe;
