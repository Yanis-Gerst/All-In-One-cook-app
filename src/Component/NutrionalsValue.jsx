import { useUserContext } from "../App";
import { useCallback } from "react";

const getSameIngredient = (userIngredients, ingredient) => {
  const sameIngredient = Object.values(userIngredients).filter((userIng) => {
    return userIng.name.toLowerCase() === ingredient.name.toLowerCase();
  });
  return sameIngredient;
};

const NutrionalsValue = ({ ingredients, nbPerson }) => {
  const user = useUserContext();

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
    (userIng) => Object.keys(userIng.nutrionals).length > 0
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
    </>
  );
};

export default NutrionalsValue;
