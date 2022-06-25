import React from "react";
import { useMemo } from "react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import isEmail from "validator/lib/isEmail";
import useMultipleInputs from "../CustomHook/useMutilpleInput";

const urlDbUser = "http://localhost:4001/user";

const setNewAccountInDb = async (userConfig) => {
  const res = await fetch(urlDbUser, {
    method: "Post",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(userConfig),
  });
  const data = await res.json();
  return data;
};

const Register = () => {
  const naviguate = useNavigate();
  const [userInputs, handleUserInputs, resetInputs] = useMultipleInputs();
  const userConfig = {
    pseudo: userInputs.pseudo,
    mail: userInputs.mail,
    password: userInputs.password,
    ingredients: {},
    recipies: [],
  };
  const [mailError, setMailError] = useState(false);
  const [samePassword, setSamePassword] = useState(true);

  const isAnEmail = () => {
    if (!userInputs.mail) return;
    const thus = isEmail(userInputs.mail);
    if (thus) {
      setMailError(false);
      return;
    }
    setMailError(true);
  };

  const arePasswordSame = () => {
    if (!userInputs.password || !userInputs.passwordConfirme) return;
    if (userInputs.password === userInputs.passwordConfirme) {
      setSamePassword(true);
      return;
    }
    setSamePassword(false);
  };

  const onRegisterSubmit = (e) => {
    e.preventDefault();
    if (!samePassword || mailError) return;
    const id = Date.now() + Math.floor(Math.random() * 100);
    setNewAccountInDb({ ...userConfig, id, mealEvents: [] });
    resetInputs();
    naviguate("/Login");
  };
  return (
    <>
      <div className="register-container">
        <h3>Créer votre Compte</h3>

        <form className="reg-form">
          <div className="form-control">
            <input
              type="text"
              name="pseudo"
              value={userInputs.pseudo || ""}
              onChange={handleUserInputs}
              placeholder="Pseudo"
            />
          </div>

          <div className="form-control">
            <input
              type="mail"
              name="mail"
              value={userInputs.mail || ""}
              onChange={handleUserInputs}
              onBlur={isAnEmail}
              placeholder="E-Mail"
            />
            {mailError && <p>Pas le bon format d'adresse Mail</p>}
          </div>

          <div className="form-control">
            <input
              type="text"
              name="password"
              value={userInputs.password || ""}
              onChange={handleUserInputs}
              placeholder="Mot de passe"
            />
          </div>

          <div className="form-control">
            <input
              type="text"
              name="passwordConfirme"
              value={userInputs.passwordConfirme || ""}
              onChange={handleUserInputs}
              onBlur={arePasswordSame}
              placeholder="Confirmer Mot de passe"
            />
            {!samePassword && <p>Le Mdp c'est pas le même enfaite</p>}
          </div>

          <div className="action-container">
            <button onClick={onRegisterSubmit} className="btn-login">
              Créer votre compte
            </button>
            <Link to={"/Login"}>Back</Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
