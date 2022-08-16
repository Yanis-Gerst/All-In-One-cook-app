import spatulaIcon from "../../img/spatulaIcon.png";
import SearchBar from "../SearchBar";
import Button from "../Button";
import React from "react";

interface Props {
  toogleShowForm: () => void;
  searchInput: string;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
}

const RecipesHeader = ({
  toogleShowForm,
  searchInput,
  setSearchInput,
}: Props) => {
  return (
    <div className="recipies-header">
      <div className="header-left">
        <img src={spatulaIcon} alt="a spatula" />
        <h1>Your Recipies</h1>
        <Button text="Add" id="main" onClick={toogleShowForm} />
      </div>
      <div className="header-right">
        <SearchBar toUpdate={setSearchInput} value={searchInput} />
      </div>
    </div>
  );
};

export default RecipesHeader;
