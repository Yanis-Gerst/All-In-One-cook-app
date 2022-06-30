import { useEffect } from "react";
import useMultipleInputs from "../CustomHook/useMutilpleInput";

const NutrionalsDropDown = ({ ingredient, toUpdate, index }) => {
  const [nutrInput, handleNutrInuput] = useMultipleInputs(
    ingredient.nutrionals
  );

  useEffect(() => {
    toUpdate({
      [index + 1]: {
        ...ingredient,
        nutrionals: { ...nutrInput },
      },
    });
  }, [nutrInput]);
  return (
    <div className="nutrionals-inputs-container">
      <div className="dropdown-control">
        <label>Pour(g):</label>
        <input
          type="number"
          name="quantity"
          onChange={handleNutrInuput}
          value={nutrInput.quantity || ""}
          placeholder="Pour x Gramme"
        />
      </div>
      <div className="dropdown-control">
        <label>Protéine:</label>
        <input
          type="number"
          name="proteine"
          onChange={handleNutrInuput}
          value={nutrInput.proteine || ""}
        />
      </div>
      <div className="dropdown-control">
        <label>Lipide:</label>
        <input
          type="number"
          name="lipide"
          onChange={handleNutrInuput}
          value={nutrInput.lipide || ""}
        />
      </div>
    </div>
  );
};

export default NutrionalsDropDown;
