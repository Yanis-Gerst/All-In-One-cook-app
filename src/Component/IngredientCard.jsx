import { useEffect, useState } from "react";
import Button from "./Button";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { GrFormAdd } from "react-icons/gr";
import DropDown from "./DropDown";
import DropDownItem from "./DropDownItem";
import NutrionalsDropDown from "./NutrionalsDropDown";
import ContentEditable from "./ContentEditable";
import { arrowNaviguation } from "./Recipies";

const IngredientCard = ({
  ingredient,
  index,
  swapPositionElement,
  toDelete,
  toUpdate,
}) => {
  const ingredientConfig = { ...ingredient };
  const [quickAddValue, setQuickAddValue] = useState(100);

  const onSubmit = (e) => {
    e.preventDefault();
    const attrName = e.target.getAttribute("data-name");

    toUpdate({
      [index + 1]: {
        ...ingredientConfig,
        [attrName]: e.target.textContent,
      },
    });
  };

  const onInput = (e) => {
    toUpdate({
      [index + 1]: {
        ...ingredientConfig,
        [e.target.name]: e.target.value,
      },
    });
  };

  const doQuickAdd = () => {
    console.log("Ca quick add");
    const newQuantity =
      Number(ingredientConfig.quantity) + Number(quickAddValue);

    toUpdate({
      [index + 1]: {
        ...ingredientConfig,
        ["quantity"]: newQuantity,
      },
    });
  };

  const handleSetQuickAddValue = (e) => {
    setQuickAddValue(e.target.value);
  };

  const handleArrowShortCut = arrowNaviguation(".ing-card", index);

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
      aria-label={`Your ingredient ${ingredientConfig.name}`}
      tabIndex="0"
      onKeyDown={handleArrowShortCut}
    >
      <button onClick={doQuickAdd}>Quick Add</button>
      <div className="ing-header">
        <DropDown title={<BsThreeDotsVertical />}>
          <DropDownItem>
            <Button
              className="btn-delete"
              onClick={() => toDelete(index)}
              icon={() => <MdDelete />}
            />
          </DropDownItem>
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
              toUpdate={toUpdate}
              index={index}
            />
          </DropDownItem>
        </DropDown>
      </div>
      <ContentEditable
        data="name"
        onKeyPress={handleInput}
        onBlur={onSubmit}
        tagName="h1"
      >
        {ingredient.name}
      </ContentEditable>

      <div className="ing-meta-data">
        <ContentEditable
          data="quantity"
          onKeyPress={handleInput}
          onBlur={onSubmit}
          tagName="p"
        >
          {ingredient.quantity}
        </ContentEditable>

        <ContentEditable
          data="unity"
          onKeyPress={handleInput}
          onBlur={onSubmit}
          tagName="p"
        >
          {ingredient.unity}
        </ContentEditable>
      </div>

      <div className="ing-desc">
        <ContentEditable
          data="descriptions"
          onKeyPress={handleInput}
          onBlur={onSubmit}
          tagName="p"
        >
          {" "}
          {ingredient.descriptions ? ingredient.descriptions : "..."}
        </ContentEditable>
      </div>
    </div>
  );
};

export default IngredientCard;
