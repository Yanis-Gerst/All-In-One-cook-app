import { useState, useContext } from "react";
import IconButton from "./IconButton";
import AddIngredient from "./AddIngredient";
import useMultipleInputs from "../CustomHook/useMutilpleInput";
import { RecipiesContext } from "./Recipies";
import { useEffect } from "react";

const AddForm = ({ toClose }) => {
  const recipies = useContext(RecipiesContext);
  const [inputs, handleInputs] = useMultipleInputs({});
  const [ingredients, setIngredients] = useState({});

  const onSubmit = async (e) => {
    e.preventDefault();
    const id = Date.now() + Math.floor(Math.random() * 100);
    recipies.add({ ...inputs, ingredients, id });
    toClose();
  };

  const addAllIngredients = (ingredients) => {
    setIngredients({ ...ingredients });
  };

  return (
    <div className="form-container">
      <form>
        <div className="form-control">
          <label>Nom de la recette:</label>
          <input
            type="text"
            placeholder="Boeuf Bourguignon"
            name="name"
            value={inputs.name || ""}
            onChange={handleInputs}
          />
        </div>
        <div className="line-input">
          <div className="form-control">
            <label>Temp de préparation:</label>
            <input
              type="text"
              placeholder="5m"
              name="prepTime"
              value={inputs.prepTime || ""}
              onChange={handleInputs}
            />
          </div>

          <div className="form-control">
            <label>Temp de Cuison:</label>
            <input
              type="text"
              placeholder="10m"
              name="cookTime"
              value={inputs.cookTime || ""}
              onChange={handleInputs}
            />
          </div>

          <div className="form-control">
            <label>Difficulty</label>
            <input
              type="number"
              placeholder="0"
              name="difficulty"
              value={inputs.difficulty || ""}
              onChange={handleInputs}
            />
          </div>

          <div className="form-control">
            <label>Tag</label>
            <input
              type="text"
              name="tag"
              value={inputs.tag || ""}
              onChange={handleInputs}
            />
          </div>
        </div>

        <div className="form-control">
          <label>Img Url</label>
          <input
            type="text"
            placeholder="Optionnel"
            name="urlImage"
            value={inputs.urlImage || ""}
            onChange={handleInputs}
          />
        </div>

        <div className="form-control textInput">
          <label>Descriptions/Informations</label>
          <textarea
            name="desc"
            value={inputs.desc || ""}
            onChange={handleInputs}
          ></textarea>
        </div>

        <div className="form-control textInput">
          <label>Process</label>
          <textarea
            name="process"
            value={inputs.process || ""}
            onChange={handleInputs}
          ></textarea>
        </div>
        <IconButton onClick={toClose} />
      </form>

      <AddIngredient addAllIngredients={addAllIngredients} />

      <input
        type="submit"
        value="add Recipies"
        className="submit-btn"
        onClick={onSubmit}
      />
    </div>
  );
};

export default AddForm;
