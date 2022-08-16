import Recipie from "../Recipe";
import Modale from "../Modal";
import AddForm from "../AddForm";
import React, { useEffect, useState, createContext } from "react";
import useToogle from "../../CustomHook/useToogle";
import { useUserContext } from "../../App";
import RecipesHeader from "../RecipesHeader";
import { useNavigate } from "react-router-dom";
import { IRecipe } from "../../Interface/userData";

interface IRecipesContext {
  add: (rec: IRecipe) => void;
  delete: (rec: IRecipe) => void;
  update: (rec: IRecipe) => void;
}
export const RecipesContext = createContext<IRecipesContext | null>(null);

export const arrowNaviguation = (className: string, index: number) => {
  const handleArrowNaviguation = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.target.contentEditable || e.target.tagName === "input") return;
    if (e.key === "ArrowRight") {
      const allCard = document.querySelectorAll(
        className
      ) as NodeListOf<HTMLElement>;
      if (index + 1 >= allCard.length) {
        allCard[0].focus();
        return;
      }
      allCard[index + 1].focus();
    } else if (e.key === "ArrowLeft") {
      const allCard = document.querySelectorAll(
        className
      ) as NodeListOf<HTMLElement>;
      if (index - 1 < 0) {
        allCard[allCard.length - 1].focus();
        return;
      }
      allCard[index - 1].focus();
    }
  };
  return handleArrowNaviguation;
};

interface ARecipes {}
const Recipes: React.FunctionComponent<ARecipes> = () => {
  const user = useUserContext();
  const naviguate = useNavigate();
  const [recipies, setRecipies] = useState(user.data.recipies);
  const [showForm, toogleShowForm] = useToogle(false);
  const [searchInput, setSearchInput] = useState("");
  const searchValue = searchInput.toLocaleLowerCase();

  useEffect(() => {
    user.setData({
      ...user.data,
      recipies,
    });
  }, [recipies]);

  const addRecipie = async (recipie: IRecipe) => {
    setRecipies([...recipies, recipie]);
  };

  const deleteRecipie = async (recipie: IRecipe) => {
    const id = recipie.id;
    setRecipies(
      recipies.filter((rec) => {
        return rec.id !== id;
      })
    );
  };

  const updateRecipie = (updateRecipie: IRecipe) => {
    setRecipies(
      recipies.map((rec) => {
        if (rec.id === updateRecipie.id) return updateRecipie;
        return rec;
      })
    );
  };

  if (!recipies) {
    naviguate("/");
    return <h1>Erreur</h1>;
  }

  return (
    <>
      <RecipesContext.Provider
        value={{
          add: addRecipie,
          update: updateRecipie,
          delete: deleteRecipie,
        }}
      >
        <div className="recipies-container">
          <RecipesHeader
            searchInput={searchInput}
            setSearchInput={setSearchInput}
            toogleShowForm={toogleShowForm}
          />
          <div className="rec-container">
            {recipies.map((rec, index) => {
              if (searchValue.includes("#")) {
                const tagInput = searchValue.replace("#", "");
                if (!rec.tag?.toLocaleLowerCase().includes(tagInput)) return;

                return <Recipie key={rec.name} recipie={rec} index={index} />;
              } else {
                if (!rec.name.toLowerCase().includes(searchValue)) {
                  return;
                }
                return <Recipie key={rec.name} recipie={rec} />;
              }
            })}
          </div>

          {showForm && (
            <Modale toClose={toogleShowForm}>
              <AddForm />
            </Modale>
          )}
        </div>
      </RecipesContext.Provider>
    </>
  );
};

export default Recipes;
