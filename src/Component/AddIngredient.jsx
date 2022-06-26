import { useEffect, useState } from "react";
import useCounter from "../CustomHook/useCounter";
import Ingredient from "./Ingredient";
import Button from "./Button";
import { AiOutlineClose } from "react-icons/ai";

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
        text={"More Ingrédient"}
        onClick={setNumberOfIngredients.increment}
        className="button-add"
      />
      {toClose && (
        <AiOutlineClose onClick={handleClose} className="btn-close" />
      )}
    </div>
  );
};

export default AddIngredient;
