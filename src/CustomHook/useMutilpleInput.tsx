import React, { useState } from "react";

const useMultipleInputs = (
  initialsValue = {}
): [
  object,
  (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => void,
  () => void
] => {
  const [state, setState] = useState(initialsValue);

  const handleInputs = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
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
