import React from "react";
import Button from "./Button";
import SearchBar from "./SearchBar";
import { CgSmartHomeRefrigerator } from "react-icons/cg";

const FridgeHeader = ({ toogleAddForm, search }) => {
  return (
    <>
      <div className="fridge-header">
        <div className="header-left">
          <CgSmartHomeRefrigerator className="fridge-header-icon" />
          <h1>Your Fridge</h1>
          <Button
            text={"Add"}
            onClick={toogleAddForm}
            className="btn-add-fridge"
          />
        </div>
        <div className="search-bar">
          <SearchBar value={search.state} toUpdate={search.setState} />
        </div>
      </div>
    </>
  );
};

export default FridgeHeader;
