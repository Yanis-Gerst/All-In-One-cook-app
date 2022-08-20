import React, { useState } from "react";
import { BiError } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../../App";
import useMultipleInputs from "../../CustomHook/useMutilpleInput";
import useToogle from "../../CustomHook/useToogle";
import { IUser } from "../../Interface/userData";
const urlDbUser = "http://localhost:4001/user";

export const fetchAllUserDataFromDb = async () => {
  const res = await fetch(urlDbUser);
  const data: IUser[] = await res.json();
  return data;
};

export const storeUserData = (userData: IUser) => {
  //Voir pour tester des choses qui vont dans le localStorage
  //Si il déjà enregister pas refaire a coder

  localStorage.setItem(
    JSON.stringify(userData.pseudo),
    JSON.stringify(userData)
  );
};

interface UserInputs {
  mail?: string;
  password?: string;
}

const Login = () => {
  const user = useUserContext();
  const naviguate = useNavigate();
  const [userInputs, handleUserInputs]: [
    UserInputs,
    (
      e:
        | React.ChangeEvent<HTMLInputElement>
        | React.ChangeEvent<HTMLSelectElement>
    ) => void,
    any
  ] = useMultipleInputs();
  const [rememberUser, toogleRememberUser] = useToogle(false);
  const [haveError, setError] = useState(false);

  const logIn = async (e: React.MouseEvent) => {
    e.preventDefault();
    const allUserData: IUser[] = await fetchAllUserDataFromDb();
    //Can get only one element

    const thisUser = allUserData.filter((userData) => {
      return (
        userData.mail === userInputs.mail &&
        userData.password === userInputs.password
      );
    })[0];

    if (!thisUser) {
      setError(true);
      return;
    }

    // A la base thisUser.id
    if (rememberUser) storeUserData(thisUser);

    user.setData(thisUser);
    naviguate(`/${thisUser.pseudo}`);
  };

  return (
    <div className="login-form-container">
      <h3>Login</h3>
      <form className="login-form">
        {haveError && (
          <p className="login-error">
            <BiError /> Adresse Mail ou mot de passe incorrecte
          </p>
        )}

        <div className="form-control">
          <input
            aria-label="Your e-mail"
            type="text"
            name="mail"
            value={userInputs.mail || ""}
            onChange={handleUserInputs}
            placeholder="Mail"
            className={haveError ? "input-error" : ""}
          />
        </div>

        <div className="form-control">
          <input
            aria-label="Your Password"
            type="password"
            name="password"
            value={userInputs.password || ""}
            onChange={handleUserInputs}
            placeholder="Password"
            className={haveError ? "input-error" : ""}
          />
        </div>

        <div className="form-control">
          <input
            aria-label="Remeber Me"
            type="checkbox"
            checked={rememberUser}
            onChange={toogleRememberUser}
          />
        </div>

        <div className="action-container">
          <button className="btn-login" onClick={logIn}>
            Log In
          </button>
          <Link to="/Register">Créer un compte</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
