import { useUserContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { GrPowerReset } from "react-icons/gr";
import Modale from "../Modale";
import useToogle from "../../CustomHook/useToogle";
import Button from "../Button";
import ChangePassForm from "./ChangePassForm";

const UserAccout = () => {
  const user = useUserContext();
  const [showPassChangeForm, toogleShowPassForm] = useToogle();
  const naviguate = useNavigate();

  const handleDisconect = () => {
    user.setData({});
    naviguate("/Login");
  };
  return (
    <>
      <div className="user-info-container">
        {Object.keys(user.data).map((key, index) => {
          const elem =
            key === "ingredients" ||
            key === "recipies" ||
            key === "id" ||
            key === "mealEvents" ? null : (
              <div className="data-container" key={key}>
                <p data={`${key}-pre`}>{key}:</p>
                <p data={`${key}-body`}>{user.data[key]}</p>
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
          Déconenexion
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
