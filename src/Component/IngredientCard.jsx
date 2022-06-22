import { useEffect, useState } from "react";
import Button from "./Button";
import { BsThreeDotsVertical } from "react-icons/bs";
import DropDown from "./DropDown";
import DropDownItem from "./DropDownItem";
import NutrionalsDropDown from "./NutrionalsDropDown";

const IngredientCard = ({
  ingredient,
  index,
  swapPositionElement,
  toDelete,
  toUpdate,
}) => {
  const [ingredientConfig, setIngredientConfig] = useState(ingredient);
  const [quickAddValue, setQuickAddValue] = useState(100);

  useEffect(() => {
    toUpdate({
      [index + 1]: ingredientConfig,
    });
  }, [ingredientConfig]);

  const onSubmit = (e) => {
    e.preventDefault();
    const attrName = e.target.getAttribute("data-name");
    setIngredientConfig({
      ...ingredientConfig,
      [attrName]: e.target.textContent,
    });
  };

  const onInput = (e) => {
    setIngredientConfig({
      ...ingredientConfig,
      [e.target.name]: e.target.value,
    });
  };

  const doQuickAdd = () => {
    const newQuantity =
      Number(ingredientConfig.quantity) + Number(quickAddValue);
    setIngredientConfig({
      ...ingredientConfig,
      ["quantity"]: newQuantity,
    });
  };

  const handleSetQuickAddValue = (e) => {
    setQuickAddValue(e.target.value);
  };

  const handleInput = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.target.blur();
    }
  };
  const onCardDrag = (e) => {
    e.dataTransfer.dropEffect = "move";
    e.dataTransfer.setData("ing-card", index);
  };

  const onCardDragOver = (e) => {
    e.preventDefault();
  };

  const onCardDragEnter = (e) => {
    e.preventDefault();
    e.target.classList.add("drag-over");
  };

  const onCardDragLeave = (e) => {
    e.preventDefault();
    e.target.classList.remove("drag-over");
  };

  const onCardDrop = (e) => {
    e.preventDefault();
    let indexOfDragCard = e.dataTransfer.getData("ing-card");
    swapPositionElement(indexOfDragCard, index);
  };

  return (
    <div
      className="ing-card"
      draggable
      onDragStart={onCardDrag}
      onDrop={onCardDrop}
      onDragOver={onCardDragOver}
      onDragEnter={onCardDragEnter}
      onDragLeave={onCardDragLeave}
      data-index={Number(index)}
    >
      <div className="ing-header">
        <DropDown title={<BsThreeDotsVertical />}>
          <DropDownItem>
            <div className="dropdown-control">
              <label>Ajout Rapide:</label>
              <input
                type="number"
                onChange={handleSetQuickAddValue}
                value={quickAddValue}
              />
            </div>
          </DropDownItem>
          <DropDownItem>
            <div className="dropdown-control">
              <label>Prix/kg: </label>
              <input
                type="number"
                placeholder="prix au kilo..."
                value={ingredientConfig.priceOnKilo || ""}
                onChange={onInput}
                name="priceOnKilo"
              />
            </div>
          </DropDownItem>
          <DropDownItem>
            <NutrionalsDropDown
              ingredient={ingredientConfig}
              setIngredient={setIngredientConfig}
            />
          </DropDownItem>
        </DropDown>
      </div>
      <h1
        suppressContentEditableWarning={true}
        contentEditable
        data-name="name"
        onBlur={onSubmit}
        onKeyPress={(e) => handleInput(e)}
      >
        {ingredient.name}
      </h1>
      <div className="ing-meta-data">
        <p>Possède</p>
        <p
          suppressContentEditableWarning={true}
          contentEditable
          data-name="quantity"
          onBlur={onSubmit}
          onKeyPress={(e) => handleInput(e)}
        >
          {ingredient.quantity}{" "}
        </p>
        <p
          suppressContentEditableWarning={true}
          contentEditable
          data-name="unity"
          onBlur={onSubmit}
          onKeyPress={(e) => handleInput(e)}
        >
          {ingredient.unity}
        </p>
      </div>

      <div className="ing-desc">
        <p
          suppressContentEditableWarning={true}
          contentEditable
          data-name="descriptions"
          onBlur={onSubmit}
          onKeyPress={(e) => handleInput(e)}
        >
          {ingredient.descriptions ? ingredient.descriptions : "Desc..."}
        </p>
      </div>

      <Button
        className="btn-ing-detail"
        text="Delete"
        onClick={() => toDelete(index)}
      />

      <Button text={"quickAdd"} onClick={doQuickAdd} />
    </div>
  );
};

export default IngredientCard;
