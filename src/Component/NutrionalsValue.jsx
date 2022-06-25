import { useUserContext } from "../App";
import { useCallback } from "react";

const getSameIngredient = (userIngredients, ingredient) => {
  const sameIngredient = Object.values(userIngredients).filter((userIng) => {
    return userIng.name.toLowerCase() === ingredient.name.toLowerCase();
  });
  return sameIngredient;
};

const capitalize = (str) => {
  const lower = str.toLowerCase();
  return lower.charAt(0).toUpperCase() + lower.slice(1);
};

const NutrionalsValue = ({ ingredients, nbPerson }) => {
  const user = useUserContext();

  const allUserIngredients = useCallback(
    Object.values(ingredients).map((ing) => {
      const sameIng = { ...getSameIngredient(user.data.ingredients, ing)[0] };
      if (Object.keys(sameIng === 0)) return;
      return {
        sameIng,
        currentQuantity: ing.quantity,
      };
    }),
    [ingredients, user.data.ingredient]
  );
  console.log(allUserIngredients, "Here");
  const nutrionalsIsNotDefine = allUserIngredients.some((userIng) => {
    if (!userIng) return true;
    return Object.keys(userIng.nutrionals).length === 0;
  });

  let recNutrionalsValue;
  if (!nutrionalsIsNotDefine) {
    recNutrionalsValue = allUserIngredients.reduce(
      (prev, curr) => {
        if (!curr.nutrionals) return prev;
        const forQuantity = curr.nutrionals.quantity;
        const coef = (curr.currentQuantity * nbPerson) / forQuantity;
        let sum = { ...prev };

        Object.keys(sum).forEach((key) => {
          if (curr.nutrionals.hasOwnProperty(key)) {
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
          Number(curr.priceOnKilo) * (curr.currentQuantity / 1000) * 10
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
              if (!recNutrionalsValue[nutrProprety]) return;
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
          <p>Prix de la recette: {priceRec}€</p>
        </div>
      ) : (
        <p>On a pas d'info sur le prix enfate</p>
      )}
    </>
  );
};

export default NutrionalsValue;
