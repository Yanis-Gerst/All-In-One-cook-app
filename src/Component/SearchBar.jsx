import React from 'react';
import { AiOutlineSearch } from "react-icons/ai";

const SearchBar = ({toUpdate, value}) => {
   const handleInput = (e) => {
       toUpdate(e.target.value)
   }

  return (
    <div className="search-bar-container">
        <div className="search-input-container">
            <input type="text" className="search-input" value={value} onChange={handleInput} />
            <div className="search-icon">
                <AiOutlineSearch/>
            </div>
        </div>
    </div>
  )
}

export default SearchBar