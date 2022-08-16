import React, { useEffect, useState } from "react";
import IngredientCard from "../IngredientCard";
import Modal from "../Modal";
import AddIngredient from "../AddIngredient";
import { useIngContext } from "../../App";
import { useUserContext } from "../../App";
import FridgeHeader from "./FridgeHeader";
import { IIngredient, IIngredients } from "../../Interface/userData";

const Fridge = () => {
  const ingredients = useIngContext();
  const user = useUserContext();
  const [searchInput, setSearchInput] = useState("");
  const searchValue = searchInput.toLowerCase();
  const [fridgeIng, setFridgeIng]: [
    IIngredients | {},
    React.Dispatch<React.SetStateAction<{}>>
  ] = useState(ingredients || {});
  const [showAddForm, setShowAddForm] = useState(false);
  const [startIndex, setStartIndex] = useState(
    Object.keys(fridgeIng).length + 1
  );

  const updateFridgeIng = (ingredients: IIngredients) => {
    const newStateFridgeIng = { ...fridgeIng, ...ingredients };

    setFridgeIng(newStateFridgeIng);
  };

  const swapPositionElement = (from: string | number, to: string | number) => {
    from = Number(from);
    to = Number(to);
    if (from === to) return;
    const newIng = {
      ...fridgeIng,
      [from + 1]: { ...fridgeIng[to + 1] },
      [to + 1]: { ...fridgeIng[from + 1] },
    };
    updateFridgeIng(newIng);
  };

  const handleDelete = (index: number) => {
    const newIngArray = Object.values(fridgeIng).filter((ing, i) => {
      if (index === i) return null;
      return ing;
    });

    const newIngObject = newIngArray.reduce((prev: object, curr, i) => {
      return {
        ...prev,
        [i + 1]: curr,
      };
    }, {});

    setStartIndex(startIndex - 1);
    setFridgeIng({ ...newIngObject });
  };

  const toogleAddForm = (): void => {
    setShowAddForm(!showAddForm);
  };

  const onClose = (cancel = false): void => {
    toogleAddForm();
    //Cancel -> Handle Cancel Button
    if (cancel) {
      setStartIndex(Object.keys(fridgeIng).length);
      return;
    }
    setStartIndex(Object.keys(fridgeIng).length + 1);
  };

  useEffect(() => {
    if (!user.isConnected) return;
    user.setData({ ...user.data, ingredients: fridgeIng });
  }, [fridgeIng]);

  if (!user.isConnected) {
    return <div>Veuillez vous connecter</div>;
  }
  return (
    <>
      <div className="fridge-container">
        <FridgeHeader
          toogleAddForm={toogleAddForm}
          search={{ state: searchInput, setState: setSearchInput }}
        />

        <div className="fridge-body">
          {Object.values(fridgeIng).map((value: IIngredient, index) => {
            if (searchValue.includes("#")) {
              const tagInput = searchValue.replace("#", "");
              if (!value.tag?.toLowerCase().includes(tagInput)) return null;
              return (
                <IngredientCard
                  key={index}
                  ingredient={{ ...value }}
                  index={index}
                  swapPositionElement={swapPositionElement}
                  toDelete={handleDelete}
                  toUpdate={updateFridgeIng}
                />
              );
            } else {
              if (!value.name?.toLowerCase().includes(searchValue)) return null;

              return (
                <IngredientCard
                  key={index}
                  ingredient={{ ...value }}
                  index={index}
                  swapPositionElement={swapPositionElement}
                  toDelete={handleDelete}
                  toUpdate={updateFridgeIng}
                />
              );
            }
          })}
        </div>
      </div>

      {showAddForm && (
        <Modal toClose={onClose}>
          <AddIngredient
            addAllIngredients={updateFridgeIng}
            deleteIngredient={handleDelete}
            startIndex={startIndex}
          />
        </Modal>
      )}
    </>
  );
};

export default Fridge;
