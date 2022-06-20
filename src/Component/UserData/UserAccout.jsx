import { useUserContext } from "../../App";
import { useNavigate } from "react-router-dom";
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
            key === "id" ? null : (
              <div className="data-container">
                <p key={`${key}Pre`} data={`${key}-pre`}>
                  {key}:
                </p>
                <p key={`${key}Body`} data={`${key}-body`}>
                  {user.data[key]}
                </p>
                {key === "password" && (
                  <Button text="Change Password" onClick={toogleShowPassForm} />
                )}
              </div>
            );
          return elem;
        })}
        <Button text="Déconnexion" onClick={handleDisconect} />
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
