import React, { useState } from "react";
import Button from "../Button";
import { useUserContext } from "../../App";
import { BiError } from "react-icons/bi";
import useMultipleInputs from "../../CustomHook/useMutilpleInput";

interface Props {
  toClose?: () => void;
}
const ChangePassForm = ({ toClose }: Props) => {
  const user = useUserContext();
  //Define interface PassInputs
  const [passInputs, handlePassInput]: [
    any,
    (
      e:
        | React.ChangeEvent<HTMLInputElement>
        | React.ChangeEvent<HTMLSelectElement>
    ) => void,
    any
  ] = useMultipleInputs({});
  const [error, setError] = useState(false);

  const onSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    const expiredPassword = user.data.password;
    if (passInputs.expiredPassword !== expiredPassword) {
      //Show Error
      setError(true);
      return;
    }
    user.setData({ ...user.data, password: passInputs.newPassword });
    if (!toClose) return;
    toClose();
  };

  //Style Inputs in Red when Error
  return (
    <>
      <div className="change-pass-container">
        <h3>Change Password</h3>
        <form>
          {error && (
            <p className="login-error">
              <BiError /> Adresse Mail ou mot de passe incorrecte
            </p>
          )}

          <div className="form-options">
            <input
              type="password"
              name="expiredPassword"
              value={passInputs.expiredPassword || ""}
              onChange={handlePassInput}
            ></input>
          </div>
          <div className="form-options">
            <input
              type="password"
              name="newPassword"
              value={passInputs.newPassword || ""}
              onChange={handlePassInput}
            ></input>
          </div>
          <button onClick={onSubmit}>Change</button>
        </form>
        <button onClick={toClose}>Back</button>
      </div>
    </>
  );
};

export default ChangePassForm;
