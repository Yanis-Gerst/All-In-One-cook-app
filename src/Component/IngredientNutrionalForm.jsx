import { useEffect } from "react";
import useMultipleInputs from "../CustomHook/useMutilpleInput";

const IngredientNutrionalForm = ({ setNutrionalsData, handleBlur }) => {
  const [nutrionalsInputs, handleNutrionalsInputs] = useMultipleInputs({});

  useEffect(() => {
    setNutrionalsData((nutrionalsData) => {
      return {
        ...nutrionalsData,
        ...nutrionalsInputs,
      };
    });
  }, [nutrionalsInputs]);

  return (
    <form className="form-ingredient" onBlur={handleBlur}>
      <div className="form-control">
        <label>Pour en g:</label>
        <input
          type="number"
          name="quantity"
          value={nutrionalsInputs.quantity || ""}
          onChange={handleNutrionalsInputs}
        />
      </div>
      <div className="form-control">
        <label>Protéine</label>
        <input
          type="number"
          name="proteine"
          value={nutrionalsInputs.proteine || ""}
          onChange={handleNutrionalsInputs}
        />
      </div>
      <div className="form-control">
        <label>Lipide</label>
        <input
          type="number"
          name="lipide"
          value={nutrionalsInputs.lipide || ""}
          onChange={handleNutrionalsInputs}
        />
      </div>
      <div className="form-control">
        <label>Calorie</label>
        <input
          type="number"
          name="calorie"
          value={nutrionalsInputs.calorie || ""}
          onChange={handleNutrionalsInputs}
        />
      </div>
    </form>
  );
};

export default IngredientNutrionalForm;
