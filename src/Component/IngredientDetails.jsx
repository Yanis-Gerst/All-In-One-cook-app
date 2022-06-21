import { useUserContext } from "../App";
import { BsThreeDotsVertical } from "react-icons/bs";
import DropDown from "./DropDown";
import DropDownItem from "./DropDownItem";

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

  let userIng = getObjectByNames(userIngredients, ingredient.name);
  let nutrionalsValues;
  if (userIng?.nutrionals) {
    nutrionalsValues = userIng.nutrionals;
  }

  if (sameIngredient.length > 0) {
    const sameIng = sameIngredient[0];
    if (quantityIngredient <= sameIng.quantity) userGetEnough = true;
  }

  return (
    <>
      <div className="ing-details-container">
        <ul className="ing">
          <li>{ingredient.name}</li>
          <li>{quantityIngredient}</li>
          <li>{ingredient.unity}</li>
          <li>{userGetEnough ? "V" : "X"}</li>
        </ul>
        {nutrionalsValues && (
          <DropDown title={<BsThreeDotsVertical />}>
            <DropDownItem>
              <p>Protéine: {nutrionalsValues.prot * nbPerson}g</p>
            </DropDownItem>
            <DropDownItem>
              <p>Lipide: {nutrionalsValues.lipide * nbPerson}g</p>
            </DropDownItem>
          </DropDown>
        )}
      </div>
    </>
  );
};

export default IngredientDetails;
