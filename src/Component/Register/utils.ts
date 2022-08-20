import { IUser } from "../../Interface/userData";

const urlDbUser = "http://localhost:4001/user";

export const setNewAccountInDb = async (userConfig: IUser) => {
  console.log("Salope Man");
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
