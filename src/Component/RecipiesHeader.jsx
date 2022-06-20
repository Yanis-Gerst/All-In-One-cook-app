import { RecipiesContext } from "./Recipies";
import { useContext } from "react";
import spatulaIcon from "../img/spatulaIcon.png";
import SearchBar from "./SearchBar";
import Button from "./Button";

const RecipiesHeader = ({ toogleShowForm, searchInput, setSearchInput }) => {
  const recipies = useContext(RecipiesContext);
  return (
    <div className="recipies-header">
      <div className="header-left">
        <img src={spatulaIcon} />
        <h1>Your Recipies</h1>
        <Button text="Add" onClick={toogleShowForm} />
      </div>
      <div className="header-right">
        <SearchBar toUpdate={setSearchInput} value={searchInput} />
      </div>
    </div>
  );
};

export default RecipiesHeader;
