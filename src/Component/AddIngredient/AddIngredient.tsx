import React, { useEffect, useState } from "react";
import useCounter from "../../CustomHook/useCounter";
import Ingredient from "../Ingredient";
import Button from "../Button";
import { AiOutlineClose } from "react-icons/ai";
import { useRef } from "react";
import { IIngredients, IIngredient } from "../../Interface/userData";

export interface Props {
  addAllIngredients: (listIng: IIngredients) => void;
  deleteIngredient?: (Index: number) => void;
  startIndex?: number;
  toClose?: any;
}
const AddIngredient = ({
  addAllIngredients,
  deleteIngredient,
  toClose = (thing?: boolean): void | string => "not-defined",
  startIndex = 1,
}: Props) => {
  //Add Input create
  const [listIngredient, setListIngredient] = useState({});
  const [numberOfIngredients, setNumberOfIngredients] = useCounter(0);
  const firstToFocus = useRef<HTMLButtonElement>(null);
  const lastToFocus = useRef<HTMLButtonElement>(null);

  const addNewIngredient = (objIngredient: IIngredient) => {
    setListIngredient({ ...listIngredient, ...objIngredient });
  };

  const handleClose = (): void => {
    addAllIngredients(listIngredient);
    toClose();
  };

  useEffect(() => {
    addAllIngredients({ ...listIngredient });
  }, [listIngredient]);

  const handleTabFirstToLast = (e: React.KeyboardEvent): void => {
    if (e.key === "Tab" && e.shiftKey) {
      e.preventDefault();
      if (!lastToFocus.current) return;
      lastToFocus.current.focus();
    }
  };

  const handleTabLastToFirst = (e: React.KeyboardEvent): void => {
    if (e.key === "Tab" && !e.shiftKey) {
      e.preventDefault();
      if (!firstToFocus.current) return;
      firstToFocus.current.focus();
    }
  };

  const handleCancel = () => {
    if (Object.keys(listIngredient).length === 0) {
      toClose();
      return;
    }
    const indexToDelete = Object.keys(listIngredient).map((key) => Number(key));

    indexToDelete.forEach((index) => {
      if (!deleteIngredient) return;

      deleteIngredient(index - 1);
    });
    const byCancel = true;
    toClose(byCancel);
  };

  return (
    <div className="add-ingredient-container">
      {toClose() === "not-defined" && (
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
        {toClose() === "not-defined" && (
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
