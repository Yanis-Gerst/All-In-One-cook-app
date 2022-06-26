import { useState } from "react";
import useMultipleInputs from "../CustomHook/useMutilpleInput";
import IngredientNutrionalForm from "./IngredientNutrionalForm";

const Ingredient = ({ indexOfThis, addNewIngredient }) => {
  const [ingredientInput, handleIngredientInputs] = useMultipleInputs({});
  const [nutrionalsData, setNutrionalsData] = useState({});
  const [error, setError] = useState(false);
  //Handle default select input
  const unity = ingredientInput.unity || "g";
  const ingredientData = {
    [indexOfThis]: {
      ...ingredientInput,
      unity,
      nutrionals: { ...nutrionalsData },
    },
  };

  const toSubmit = () => {
    if (!ingredientInput.name || !ingredientInput.quantity) {
      setError(true);
      return;
    }

    if (error) setError(false);
    addNewIngredient(ingredientData);
  };
  return (
    <>
      <div className="add-ing-header">
        <h3>Ingrédient {indexOfThis}:</h3>

        {error && (
          <p className="text-error">Veuillez mettre un nom et une quantité</p>
        )}
      </div>
      <form className="form-ingredient" id="ingredient-form" onBlur={toSubmit}>
        <div className="form-control">
          <label>Nom</label>
          <input
            type="text"
            name="name"
            className={error ? "error" : ""}
            value={ingredientInput.name || ""}
            onChange={handleIngredientInputs}
          />
        </div>
        <div className="form-control">
          <label>Quantité</label>
          <input
            type="number"
            name="quantity"
            className={error ? "error" : ""}
            value={ingredientInput.quantity || ""}
            onChange={handleIngredientInputs}
          />
        </div>
        <div className="form-control">
          <label>Unité</label>
          <select
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
