import { useState } from "react";

const useMultipleInputs = (initialsValue = {}) => {
  const [state, setState] = useState(initialsValue);

  const handleInputs = (e) => {
    //Need name in input Jsx
    const { name, value } = e.target;

    setState({
      ...state,
      [name]: value,
    });
  };

  const resetInputs = () => {
    setState(initialsValue);
  };

  return [state, handleInputs, resetInputs];
};

export default useMultipleInputs;
