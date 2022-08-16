import { useUserContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { GrPowerReset } from "react-icons/gr";
import Modale from "../Modal";
import useToogle from "../../CustomHook/useToogle";
import ChangePassForm from "../ChangePassForm";
import React from "react";

const UserAccout = () => {
  const user = useUserContext();
  const [showPassChangeForm, toogleShowPassForm] = useToogle(false);
  const naviguate = useNavigate();

  const handleDisconect = () => {
    user.setData({ mealEvents: [], ingredients: [], recipies: [], id: 404 });
    naviguate("/Login");
  };
  return (
    <>
      <div className="user-info-container">
        {Object.keys(user.data).map((key) => {
          const elem =
            key === "ingredients" ||
            key === "recipies" ||
            key === "id" ||
            key === "mealEvents" ? null : (
              <div className="data-container" key={key}>
                <p data-pre={`${key}-pre`}>
                  {key === "password" ? "Mot de passe" : key}:
                </p>
                <p data-body={`${key}-body`}>{user.data[key]}</p>
                {key === "password" && (
                  <button className="button-reset" onClick={toogleShowPassForm}>
                    <GrPowerReset />
                  </button>
                )}
              </div>
            );
          return elem;
        })}
        <button className="button-disconect" onClick={handleDisconect}>
          Déconexion
        </button>
      </div>

      {showPassChangeForm && (
        <Modale toClose={toogleShowPassForm}>
          <ChangePassForm />
        </Modale>
      )}
    </>
  );
};

export default UserAccout;
