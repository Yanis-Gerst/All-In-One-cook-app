import Recipie from "./Recipie";
import Modale from "./Modale";
import AddForm from "./AddForm";
import { useEffect, useState, createContext } from "react";
import useToogle from "../CustomHook/useToogle";
import { useUserContext } from "../App";
import RecipiesHeader from "./RecipiesHeader";
import { useNavigate } from "react-router-dom";

export const arrowNaviguation = (className, index) => {
  const handleArrowNaviguation = (e) => {
    if (e.target.contentEditable || e.target.tagName === "input") return;
    if (e.key === "ArrowRight") {
      const allCard = document.querySelectorAll(className);
      if (index + 1 >= allCard.length) {
        allCard[0].focus();
        return;
      }
      allCard[index + 1].focus();
    } else if (e.key === "ArrowLeft") {
      const allCard = document.querySelectorAll(className);
      if (index - 1 < 0) {
        allCard[allCard.length - 1].focus();
        return;
      }
      allCard[index - 1].focus();
    }
  };
  return handleArrowNaviguation;
};

export const RecipiesContext = createContext();

const Recipies = () => {
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

  const addRecipie = async (recipie) => {
    setRecipies([...recipies, recipie]);
  };

  const deleteRecipie = async (recipie) => {
    const id = recipie.id;
    setRecipies(
      recipies.filter((rec) => {
        return rec.id !== id;
      })
    );
  };

  const updateRecipie = (updateRecipie) => {
    setRecipies(
      recipies.map((rec) => {
        if (rec.id === updateRecipie.id) return updateRecipie;
        return rec;
      })
    );
  };

  if (!recipies) {
    naviguate("/");
    return;
  }

  return (
    <>
      <RecipiesContext.Provider
        value={{
          add: addRecipie,
          update: updateRecipie,
          delete: deleteRecipie,
        }}
      >
        <div className="recipies-container">
          <RecipiesHeader
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
              <AddForm toAdd={addRecipie} />
            </Modale>
          )}
        </div>
      </RecipiesContext.Provider>
    </>
  );
};

export default Recipies;
