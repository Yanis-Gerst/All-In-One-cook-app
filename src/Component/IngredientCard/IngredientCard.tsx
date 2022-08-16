import React, { useState } from "react";
import Button from "../Button";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdDelete } from "react-icons/md";

import DropDown from "../Dropdown";
import DropDownItem from "../Dropdown/DropdownItem";
import NutrionalsDropDown from "../NutrioanalsDropDown";
import ContentEditable from "../ContentEditable";
import { arrowNaviguation } from "../Recipes/Recipes";
import { IIngredient } from "../../Interface/userData";

interface IngUpdate {
  [index: number]: IIngredient;
}
interface Props {
  ingredient: IIngredient;
  index: number;
  swapPositionElement: (from: number, to: number) => void;
  toDelete: (index: number) => void;
  toUpdate: (ing: IngUpdate) => void;
}
const IngredientCard = ({
  ingredient,
  index,
  swapPositionElement,
  toDelete,
  toUpdate,
}: Props) => {
  const ingredientConfig = { ...ingredient };
  const [quickAddValue, setQuickAddValue] = useState(100);

  const onSubmit = (e: React.FocusEvent<HTMLElement>) => {
    e.preventDefault();
    const attrName: string = e.target.getAttribute("data-name") as string;

    toUpdate({
      [index + 1]: {
        ...ingredientConfig,
        [attrName]: e.target.textContent,
      },
    });
  };

  const onInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    toUpdate({
      [index + 1]: {
        ...ingredientConfig,
        [e.target.name]: e.target.value,
      },
    });
  };

  const doQuickAdd = () => {
    const newQuantity =
      Number(ingredientConfig.quantity) + Number(quickAddValue);

    toUpdate({
      [index + 1]: {
        ...ingredientConfig,
        quantity: newQuantity,
      },
    });
  };

  const handleSetQuickAddValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuickAddValue(Number(e.target.value));
  };

  const handleArrowShortCut = arrowNaviguation(".ing-card", index);

  const handleInput = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.target.blur();
    }
  };
  const onCardDrag = (e: React.DragEvent<HTMLElement>) => {
    e.stopPropagation();
    e.dataTransfer.dropEffect = "move";
    e.dataTransfer.setData("ing-card", index.toString());
  };

  const onCardDragOver = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const onCardDragEnter = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const element = e.target as HTMLElement;

    if (element.tagName !== "DIV") return;
    console.log("yo on met la classe enfaite");
    element.classList.add("drag-over");
  };

  const onCardDragLeave = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const element = e.target as HTMLElement;
    element.classList.remove("drag-over");
  };

  const onCardDrop = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const element = e.target as HTMLElement;
    element.classList.remove("drag-over");
    let indexOfDragCard = Number(e.dataTransfer.getData("ing-card"));
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
      tabIndex={0}
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
