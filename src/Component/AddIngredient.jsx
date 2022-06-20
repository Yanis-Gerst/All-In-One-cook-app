import { useEffect, useState } from "react";
import useCounter from "../CustomHook/useCounter";
import Ingredient from "./Ingredient";
import Button from "./Button";

const AddIngredient = ({
  addAllIngredients,
  toClose = null,
  startIndex = 1,
}) => {
  //Add Input create
  const [listIngredient, setListIngredient] = useState({});
  const [numberOfIngredients, setNumberOfIngredients] = useCounter(0);

  const addNewIngredient = (objIngredient) => {
    setListIngredient({ ...listIngredient, ...objIngredient });
  };

  const handleClose = () => {
    addAllIngredients(listIngredient);
    toClose();
  };

  useEffect(() => {
    addAllIngredients({ ...listIngredient });
  }, [listIngredient]);

  return (
    <div className="add-ingredient-container">
      <Ingredient
        indexOfThis={startIndex}
        addNewIngredient={addNewIngredient}
      />
      {[...new Array(numberOfIngredients)].map((v, i) => (
        <Ingredient
          key={i}
          indexOfThis={i + startIndex + 1}
          addNewIngredient={addNewIngredient}
        />
      ))}
      <Button
        text={"Add Ingrédient"}
        onClick={setNumberOfIngredients.increment}
      />
      {toClose && <Button text={"Close"} onClick={handleClose} />}
    </div>
  );
};

export default AddIngredient;
