import { useState } from "react";
import useMultipleInputs from "../CustomHook/useMutilpleInput";
import IngredientNutrionalForm from "./IngredientNutrionalForm";

const Ingredient = ({ indexOfThis, addNewIngredient }) => {
  const [ingredientInput, handleIngredientInputs] = useMultipleInputs({});
  const [nutrionalsData, setNutrionalsData] = useState({});
  const ingredientData = {
    [indexOfThis]: { ...ingredientInput, nutrionals: { ...nutrionalsData } },
  };

  const toSubmit = () => {
    console.log(ingredientData);
    addNewIngredient(ingredientData);
  };
  return (
    <>
      <h3>Ingrédient {indexOfThis}:</h3>

      <form className="form-ingredient" onBlur={toSubmit}>
        <div className="form-control">
          <label>Nom</label>
          <input
            type="text"
            name="name"
            value={ingredientInput.name || ""}
            onChange={handleIngredientInputs}
          />
        </div>
        <div className="form-control">
          <label>Quantité</label>
          <input
            type="text"
            name="quantity"
            value={ingredientInput.quantity || ""}
            onChange={handleIngredientInputs}
          />
        </div>
        <div className="form-control">
          <label>Unité</label>
          <input
            type="text"
            name="unity"
            value={ingredientInput.unity || ""}
            onChange={handleIngredientInputs}
          />
        </div>
        <div className="form-control">
          <label>Tag</label>
          <input
            type="text"
            name="tag"
            value={ingredientInput.tag || ""}
            onChange={handleIngredientInputs}
          />
        </div>
      </form>
      <IngredientNutrionalForm
        setNutrionalsData={setNutrionalsData}
        handleBlur={toSubmit}
      />
    </>
  );
};

export default Ingredient;
