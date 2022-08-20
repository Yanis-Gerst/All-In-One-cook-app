import { useUserContext } from "../../App";
import {
  IIngredient,
  IIngredients,
  INutrional,
  INutrionals,
} from "../../Interface/userData";
import React from "react";

const getSameIngredient = (
  userIngredients: IIngredients,
  ingredient: IIngredient
): IIngredient[] => {
  const sameIngredient = Object.values(userIngredients).filter(
    (userIng: IIngredient) => {
      return userIng.name.toLowerCase() === ingredient.name.toLowerCase();
    }
  );

  return sameIngredient;
};

const capitalize = (str: string) => {
  const lower = str.toLowerCase();
  return lower.charAt(0).toUpperCase() + lower.slice(1);
};

interface Props {
  ingredients: IIngredients;
  nbPerson: number;
}
const NutrionalsValue = ({ ingredients, nbPerson }: Props) => {
  const user = useUserContext();

  const allUserIngredients = Object.values(ingredients).map(
    (ing: IIngredient) => {
      let sameIng = getSameIngredient(user.data.ingredients, ing)[0];
      if (sameIng === undefined) return null;
      if (Object.keys(sameIng).length === 0) return null;
      return {
        ...sameIng,
        currentQuantity: ing.quantity,
      };
    }
  );

  const nutrionalsIsNotDefine = allUserIngredients.some((userIng) => {
    if (!userIng) return true;
    const nutrionals = userIng.nutrionals as INutrionals;

    return Object.keys(nutrionals).length === 0;
  });

  let recNutrionalsValue: undefined | INutrional;
  if (!nutrionalsIsNotDefine) {
    recNutrionalsValue = allUserIngredients.reduce(
      (prev, curr) => {
        if (!curr) return prev;
        if (!curr.nutrionals) return prev;
        const forQuantity = Number(curr.nutrionals.quantity);
        const coef = (Number(curr.currentQuantity) * nbPerson) / forQuantity;
        let sum = { ...prev };

        Object.keys(sum).forEach((key) => {
          if (curr.nutrionals?.hasOwnProperty(key)) {
            sum[key] += Number(curr.nutrionals[key]) * coef;
          } else {
            //Prevent false Value
            sum[key] = undefined;
          }
        });
        return sum;
      },
      { proteine: 0, lipide: 0, calorie: 0 }
    );
  }

  //Money Component, createContext for allUserIngredient

  let priceRec;

  if (
    allUserIngredients.every((value) => {
      if (!value) return false;
      return typeof value.priceOnKilo !== "undefined";
    })
  ) {
    priceRec = allUserIngredients.reduce((prev, curr) => {
      //Avoir le prix au gramme présent dans la recette
      let currentPrice =
        Math.round(
          Number(curr?.priceOnKilo) *
            (Number(curr?.currentQuantity) / 1000) *
            10
        ) / 10;

      return Math.round((prev + currentPrice) * 10) / 10;
    }, 0);
  }

  return (
    <>
      {recNutrionalsValue ? (
        <div className="nutrionals-value">
          <h4>Valeur nutrionelle</h4>
          <ul>
            {Object.keys(recNutrionalsValue).map((nutrProprety) => {
              if (!recNutrionalsValue) return;
              if (!recNutrionalsValue[nutrProprety]) return null;
              if (nutrProprety === "calorie") {
                return (
                  <li key={nutrProprety}>
                    {capitalize(nutrProprety)}{" "}
                    {recNutrionalsValue[nutrProprety]}Kcal
                  </li>
                );
              }
              return (
                <li key={nutrProprety}>
                  {capitalize(nutrProprety)} {recNutrionalsValue[nutrProprety]}g
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <p>On a pas les infos sur tous les ingrédients</p>
      )}

      {priceRec ? (
        <div className="price-container">
          <p>Prix de la recette: {priceRec * nbPerson}€</p>
        </div>
      ) : (
        <p>On a pas d'info sur le prix enfate</p>
      )}
    </>
  );
};

export default NutrionalsValue;
