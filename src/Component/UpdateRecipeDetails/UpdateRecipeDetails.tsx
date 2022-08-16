import React from "react";
import { IRecipe } from "../../Interface/userData";

interface Props {
  handleChange: ({
    e,
    key,
  }: {
    e: React.ChangeEvent<HTMLInputElement>;
    key: string;
  }) => void;
  onSubmit: (e: React.MouseEvent<HTMLInputElement>) => void;
  currentRecipie: IRecipe;
}
const UpdateRecipeDetails = ({
  handleChange,
  onSubmit,
  currentRecipie,
}: Props) => {
  return (
    <div className="rec-detail-container">
      <form>
        <div className="form-control rec-name">
          <input
            type="text"
            value={currentRecipie.name}
            onChange={(e) => handleChange({ e, key: "name" })}
          />
        </div>

        <div className="form-control rec-prep">
          <input
            type="text"
            value={currentRecipie.prepTime}
            onChange={(e) => handleChange({ e, key: "prepTime" })}
          />
        </div>

        <div className="form-control rec-cooking-time">
          <input
            type="text"
            value={currentRecipie.cookTime}
            onChange={(e) => handleChange({ e, key: "cookTime" })}
          />
        </div>

        <div className="form-control rec-desc">
          <input
            type="text"
            value={currentRecipie.desc}
            onChange={(e) => handleChange({ e, key: "desc" })}
          />
        </div>

        <input type="submit" value="Enregistrer" onClick={(e) => onSubmit(e)} />
      </form>
    </div>
  );
};

export default UpdateRecipeDetails;
