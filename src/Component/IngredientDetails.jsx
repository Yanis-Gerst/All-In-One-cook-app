import { useUserContext } from "../App";

const getSameIngredient = (userIngredients, ingredient) => {
  const sameIngredient = Object.values(userIngredients).filter((userIng) => {
    return userIng.name.toLowerCase() === ingredient.name.toLowerCase();
  });
  return sameIngredient;
};

const getObjectByNames = (giver, name) => {
  const data = Object.values(giver).filter((value) => {
    return value.name === name;
  });
  if (!data) return;
  return data[0];
};

const IngredientDetails = ({ ingredient, nbPerson }) => {
  const userData = useUserContext().data;
  const userIngredients = userData.ingredients;
  const sameIngredient = getSameIngredient(userIngredients, ingredient);
  const quantityIngredient = ingredient.quantity * nbPerson;
  let userGetEnough = false;

  let nutrionalsValues;
  if (ingredient.name === "Roquefort") {
    nutrionalsValues = getObjectByNames(
      userIngredients,
      ingredient.name
    ).nutrionals;
  }

  if (sameIngredient.length > 0) {
    const sameIng = sameIngredient[0];
    if (quantityIngredient <= sameIng.quantity) userGetEnough = true;
  }

  return (
    <>
      <ul className="ing">
        <li>{ingredient.name}</li>
        <li>{quantityIngredient}</li>
        <li>{ingredient.unity}</li>
        <li>{userGetEnough ? "V" : "X"}</li>
      </ul>
      {nutrionalsValues && (
        <ul className="ing">
          <li>Protéine: {nutrionalsValues.prot}g</li>
          <li>Lipide: {nutrionalsValues.lipide}g</li>
        </ul>
      )}
    </>
  );
};

export default IngredientDetails;
