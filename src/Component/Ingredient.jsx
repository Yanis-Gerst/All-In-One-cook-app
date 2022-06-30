import { useState } from "react";
import useMultipleInputs from "../CustomHook/useMutilpleInput";
import IngredientNutrionalForm from "./IngredientNutrionalForm";

const Ingredient = ({ indexOfThis, addNewIngredient }) => {
  const [ingredientInput, handleIngredientInputs] = useMultipleInputs({});
  const [nutrionalsData, setNutrionalsData] = useState({});
  const [error, setError] = useState(false);
  //Handle default select input
  const unity = ingredientInput.unity || "g";
  const quantity = ingredientInput.quantity || "0";
  const ingredientData = {
    [indexOfThis]: {
      ...ingredientInput,
      unity,
      quantity,
      nutrionals: { ...nutrionalsData },
    },
  };

  const toSubmit = () => {
    if (!ingredientInput.name) {
      setError(true);
      return;
    }

    addNewIngredient(ingredientData);
    if (error) setError(false);
  };
  return (
    <>
      <div className="add-ing-header">
        <h3>Ingrédient {indexOfThis}:</h3>

        {error && <p className="text-error">Veuillez mettre un nom </p>}
      </div>
      <form className="form-ingredient" id="ingredient-form" onBlur={toSubmit}>
        <div className="form-control">
          <label htmlFor="ingredient-name">Nom</label>
          <input
            id="ingredient-name"
            type="text"
            name="name"
            className={error ? "error" : ""}
            value={ingredientInput.name || ""}
            onChange={handleIngredientInputs}
          />
        </div>
        <div className="form-control">
          <label htmlFor="quantity">Quantité</label>
          <input
            id="quantity"
            type="number"
            name="quantity"
            value={ingredientInput.quantity || ""}
            onChange={handleIngredientInputs}
          />
        </div>
        <div className="form-control">
          <label htmlFor="unity">Unité</label>
          <select
            id="unity"
            name="unity"
            form="ingredient-form"
            value={ingredientInput.unity || ""}
            onChange={handleIngredientInputs}
          >
            <option value="g">g</option>
            <option value="ml">ml</option>
          </select>
        </div>
        <div className="form-control">
          <label htmlFor="ingredient-tag">Tag</label>
          <input
            id="ingredient-tag"
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
