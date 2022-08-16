import { useUserContext } from "../../App";
import { BsThreeDotsVertical } from "react-icons/bs";
import DropDown from "../Dropdown";
import DropDownItem from "../Dropdown/DropdownItem";
import React, { useState, useEffect } from "react";
import ContentEditable from "../ContentEditable";
import { IIngredient, IIngredients, IRecipe } from "../../Interface/userData";

const getSameIngredient = (
  userIngredients: IIngredients,
  ingredient: IIngredient
) => {
  const sameIngredient = Object.values(userIngredients).filter((userIng) => {
    return userIng.name.toLowerCase() === ingredient.name.toLowerCase();
  });
  return sameIngredient;
};

const getObjectByNames = (giver: object, name: string) => {
  //Object with a name proprety
  const data = Object.values(giver).filter((value) => {
    return value.name === name;
  });
  if (!data) return;
  return data[0];
};

interface Props {
  ingredient: IIngredient;
  nbPerson: number;
  recipie: IRecipe;
  setCurrentRecipie: (rec: IRecipe) => void;
  index: number;
}
const IngredientDetails = ({
  ingredient,
  nbPerson,
  recipie,
  setCurrentRecipie,
  index,
}: Props) => {
  const [ingredientInput, setIngredientInput] = useState(ingredient);

  const userData = useUserContext().data;
  const userIngredients = userData.ingredients;
  const sameIngredient = getSameIngredient(userIngredients, ingredient);
  const quantityIngredient = Number(ingredient.quantity) * nbPerson;
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

  const handleBlur = (e: React.FocusEvent<HTMLElement>) => {
    const attrName = e.target.getAttribute("data-name") as string;
    setIngredientInput({
      ...ingredientInput,
      [attrName]: e.target.textContent,
    });
  };

  useEffect(() => {
    setCurrentRecipie({
      ...recipie,
      ingredients: {
        ...recipie.ingredients,
        [index + 1]: { ...ingredientInput },
      },
    });
  }, [ingredientInput]);
  return (
    <>
      <div className="ing-details-container">
        <ul className="ing">
          {/* <li>{ingredient.name}</li> */}
          <li>
            <ContentEditable data="name" tagName="p" onBlur={handleBlur}>
              {ingredient.name}
            </ContentEditable>
          </li>
          <li>{quantityIngredient}</li>
          <li>{ingredient.unity}</li>
          <li>{userGetEnough ? "V" : "X"}</li>
        </ul>
        {nutrionalsValues && (
          <DropDown title={<BsThreeDotsVertical />}>
            <DropDownItem>
              <p>Protéine: {nutrionalsValues.prot * nbPerson || "..."}g</p>
            </DropDownItem>
            <DropDownItem>
              <p>Lipide: {nutrionalsValues.lipide * nbPerson || "..."}g</p>
            </DropDownItem>
          </DropDown>
        )}
      </div>
    </>
  );
};

export default IngredientDetails;
