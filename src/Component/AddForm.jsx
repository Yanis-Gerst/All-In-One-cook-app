import { useState, useContext } from "react";
import IconButton from "./IconButton";
import AddIngredient from "./AddIngredient";
import useMultipleInputs from "../CustomHook/useMutilpleInput";
import { RecipiesContext } from "./Recipies";
import { IoIosClose } from "react-icons/io";
import { useEffect } from "react";
import { useRef } from "react";

const AddForm = ({ toClose }) => {
  const recipies = useContext(RecipiesContext);
  const [inputs, handleInputs] = useMultipleInputs({});
  const [ingredients, setIngredients] = useState({});
  const firstToFocus = useRef();
  const lastToFocus = useRef();

  const onSubmit = async (e) => {
    e.preventDefault();
    const id = Date.now() + Math.floor(Math.random() * 100);
    recipies.add({ ...inputs, ingredients, id });
    toClose();
  };

  const addAllIngredients = (ingredients) => {
    setIngredients({ ...ingredients });
  };

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
  return (
    <div className="form-container">
      <div className="form-header">
        <input
          type="submit"
          value="add Recipies"
          className="submit-btn"
          onClick={onSubmit}
          onKeyDown={handleTabLastToFirst}
          ref={lastToFocus}
        />
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
      <form>
        <div className="form-control">
          <label for="recipe-name">Nom de la recette:</label>
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
            <label for="prep-time">Temp de préparation:</label>
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
            <label for="cook-time">Temp de Cuison:</label>
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
            <label for="note">Difficulty</label>
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
            <label for="tag">Tag</label>
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
          <label for="url-img">Img Url</label>
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
          <label for="description">Descriptions/Informations</label>
          <textarea
            id="description"
            name="desc"
            value={inputs.desc || ""}
            onChange={handleInputs}
          ></textarea>
        </div>

        <div className="form-control textInput">
          <label for="process">Process</label>
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
