import Button from "./Button";
import Recipie from "./Recipie";
import Modale from "./Modale";
import AddForm from "./AddForm";
import SearchBar from "./SearchBar";
import { useEffect, useState, createContext } from "react";
import useToogle from "../CustomHook/useToogle";
import { useUserContext } from "../App";
import spatulaIcon from "../img/spatulaIcon.png";
import RecipiesHeader from "./RecipiesHeader";

export const RecipiesContext = createContext();

const Recipies = () => {
  const user = useUserContext();
  const [recipies, setRecipies] = useState(user.data.recipies);
  const [showForm, toogleShowForm] = useToogle(false);
  const [searchInput, setSearchInput] = useState("");
  const searchValue = searchInput.toLocaleLowerCase();

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

  const updateRecipie = async (updateRecipie) => {
    setRecipies(
      recipies.map((rec) => {
        console.log(rec.id, updateRecipie.id);
        if (rec.id === updateRecipie.id) return updateRecipie;
        return rec;
      })
    );
  };

  useEffect(() => {
    user.setData({ ...user.data, recipies });
  }, [recipies]);

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
            {recipies.map((rec) => {
              if (searchValue.includes("#")) {
                const tagInput = searchValue.replace("#", "");
                if (!rec.tag?.toLocaleLowerCase().includes(tagInput)) return;

                return <Recipie key={rec.name} recipie={rec} />;
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
