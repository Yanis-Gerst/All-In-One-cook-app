import React, { useState, useContext } from "react";
import AddIngredient from "../AddIngredient";
import useMultipleInputs from "../../CustomHook/useMutilpleInput";
import { RecipesContext } from "../Recipes";
import { IoIosClose } from "react-icons/io";
import { useRef } from "react";
import { IRecipe } from "../../Interface/userData";

export interface Props {
  toClose?: () => void;
}

interface IInputs {
  name?: string;
  prepTime?: string;
  cookTime?: string;
  difficulty?: string;
  tag?: string;
  urlImage?: string;
  desc?: string;
  process?: string;
}

const AddForm = ({ toClose }: Props) => {
  const recipies = useContext(RecipesContext);
  const [inputs, handleInputs]: [
    IInputs,
    (
      e:
        | React.ChangeEvent<HTMLSelectElement>
        | React.ChangeEvent<HTMLInputElement>
        | React.ChangeEvent<HTMLTextAreaElement>
    ) => void,
    any
  ] = useMultipleInputs({});
  const [ingredients, setIngredients] = useState({});
  const firstToFocus = useRef<HTMLButtonElement>(null);
  const lastToFocus = useRef<HTMLButtonElement>(null);

  const onSubmit = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const id = Date.now() + Math.floor(Math.random() * 100);
    const rec = { ...inputs } as IRecipe;
    recipies?.add({ ...rec, ingredients, id });
    if (!toClose) return;
    toClose();
  };

  const addAllIngredients = (ingredients) => {
    setIngredients({ ...ingredients });
  };

  const handleTabFirstToLast = (e: React.KeyboardEvent): void => {
    if (e.key === "Tab" && e.shiftKey) {
      e.preventDefault();
      if (!lastToFocus.current) return;
      lastToFocus.current.focus();
    }
  };

  // const handleTabLastToFirst = (e) => {
  //   if (e.key === "Tab" && !e.shiftKey) {
  //     e.preventDefault();
  //     firstToFocus.current.focus();
  //   }
  // };

  return (
    <div className="form-container">
      <div className="form-header">
        <button
          type="submit"
          value="add Recipies"
          className="button-add"
          onClick={onSubmit}
          ref={lastToFocus}
        >
          Ajouter votre recette
        </button>

        <button
          className="add-form-btn-close"
          onClick={toClose}
          aria-label={"A button to close Modale"}
          onKeyDown={handleTabFirstToLast}
          ref={firstToFocus}
        >
          <IoIosClose />
        </button>
      </div>
      <form className="add-form">
        <div className="form-control">
          <label htmlFor="recipe-name">Nom de la recette:</label>
          <input
            id="recipe-name"
            type="text"
            placeholder="Boeuf Bourguignon"
            name="name"
            value={inputs.name || ""}
            onChange={handleInputs}
            autoFocus
          />
        </div>
        <div className="line-input">
          <div className="form-control">
            <label htmlFor="prep-time">Temp de préparation:</label>
            <input
              id="prep-time"
              type="text"
              placeholder="5m"
              name="prepTime"
              value={inputs.prepTime || ""}
              onChange={handleInputs}
            />
          </div>

          <div className="form-control">
            <label htmlFor="cook-time">Temp de Cuison:</label>
            <input
              id="cook-time"
              type="text"
              placeholder="10m"
              name="cookTime"
              value={inputs.cookTime || ""}
              onChange={handleInputs}
            />
          </div>

          <div className="form-control">
            <label htmlFor="note">Difficulty</label>
            <input
              id="note"
              type="number"
              placeholder="0"
              name="difficulty"
              value={inputs.difficulty || ""}
              onChange={handleInputs}
            />
          </div>

          <div className="form-control">
            <label htmlFor="tag">Tag</label>
            <input
              id="tag"
              type="text"
              name="tag"
              value={inputs.tag || ""}
              onChange={handleInputs}
            />
          </div>
        </div>

        <div className="form-control">
          <label htmlFor="url-img">Img Url</label>
          <input
            id="url-img"
            type="text"
            placeholder="Optionnel"
            name="urlImage"
            value={inputs.urlImage || ""}
            onChange={handleInputs}
          />
        </div>

        <div className="form-control textInput">
          <label htmlFor="description">Descriptions/Informations</label>
          <textarea
            id="description"
            name="desc"
            value={inputs.desc || ""}
            onChange={handleInputs}
          ></textarea>
        </div>

        <div className="form-control textInput">
          <label htmlFor="process">Process</label>
          <textarea
            id="process"
            name="process"
            value={inputs.process || ""}
            onChange={handleInputs}
          ></textarea>
        </div>
      </form>

      <AddIngredient addAllIngredients={addAllIngredients} />
    </div>
  );
};

export default AddForm;
