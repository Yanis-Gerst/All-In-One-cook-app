import { useEffect, useState } from "react";
import useCounter from "../CustomHook/useCounter";
import Ingredient from "./Ingredient";
import Button from "./Button";
import { AiOutlineClose } from "react-icons/ai";
import { useRef } from "react";

const AddIngredient = ({
  addAllIngredients,
  deleteIngredient,
  toClose = null,
  startIndex = 1,
}) => {
  //Add Input create
  const [listIngredient, setListIngredient] = useState({});
  const [numberOfIngredients, setNumberOfIngredients] = useCounter(0);
  const firstToFocus = useRef();
  const lastToFocus = useRef();

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

  const handleTabFirstToLast = (e) => {
    if (e.key === "Tab" && e.shiftKey) {
      e.preventDefault();
      lastToFocus.current.focus();
    }
  };

  const handleTabLastToFirst = (e) => {
    if (e.key === "Tab" && !e.shiftKey) {
      e.preventDefault();
      firstToFocus.current.focus();
    }
  };

  const handleCancel = () => {
    if (Object.keys(listIngredient) === 0) {
      toClose();
      return;
    }
    const indexToDelete = Object.keys(listIngredient);

    indexToDelete.forEach((index) => deleteIngredient(Number(index - 1)));
    toClose();
  };

  return (
    <div className="add-ingredient-container">
      {toClose && (
        <button
          className="btn-close"
          onClick={handleCancel}
          ref={firstToFocus}
          autoFocus
          onKeyDown={handleTabFirstToLast}
        >
          <AiOutlineClose />
        </button>
      )}
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
      <div className="double-spaced-container">
        <Button
          text={"More Ingrédient"}
          onClick={setNumberOfIngredients.increment}
          className="button-add-ing"
        />
        {toClose && (
          <button
            onClick={handleClose}
            ref={lastToFocus}
            onKeyDown={handleTabLastToFirst}
            className="button-add"
          >
            Complete
          </button>
        )}
      </div>
    </div>
  );
};

export default AddIngredient;
