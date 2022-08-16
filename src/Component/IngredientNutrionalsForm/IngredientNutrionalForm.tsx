import React, { useEffect } from "react";
import useMultipleInputs from "../../CustomHook/useMutilpleInput";
import { INutrional } from "../../Interface/userData";

interface Props {
  setNutrionalsData: React.Dispatch<React.SetStateAction<{}>>;
  handleBlur: (e: React.FocusEvent<HTMLElement>) => void;
}

const IngredientNutrionalForm = ({ setNutrionalsData, handleBlur }: Props) => {
  const [nutrionalsInputs, handleNutrionalsInputs]: [
    INutrional,
    (
      e:
        | React.ChangeEvent<HTMLInputElement>
        | React.ChangeEvent<HTMLSelectElement>
    ) => void,
    any
  ] = useMultipleInputs({});

  useEffect(() => {
    setNutrionalsData((nutrionalsData) => {
      return {
        ...nutrionalsData,
        ...nutrionalsInputs,
      };
    });
  }, [nutrionalsInputs]);

  return (
    <form className="form-ingredient nutr" onBlur={handleBlur}>
      <div className="form-control">
        <label htmlFor="ref-value">Pour en g:</label>
        <input
          id="ref-value"
          type="number"
          name="quantity"
          value={nutrionalsInputs.quantity || ""}
          onChange={handleNutrionalsInputs}
        />
      </div>
      <div className="form-control">
        <label htmlFor="prot">Protéine</label>
        <input
          id="prot"
          type="number"
          name="proteine"
          value={nutrionalsInputs.proteine || ""}
          onChange={handleNutrionalsInputs}
        />
      </div>
      <div className="form-control">
        <label htmlFor="lipide">Lipide</label>
        <input
          id="lipide"
          type="number"
          name="lipide"
          value={nutrionalsInputs.lipide || ""}
          onChange={handleNutrionalsInputs}
        />
      </div>
      <div className="form-control">
        <label htmlFor="calorie">Calorie</label>
        <input
          id="calorie"
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
