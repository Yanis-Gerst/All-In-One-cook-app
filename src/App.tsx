import Header from "./Component/Header";
import Login from "./Component/Login";
import Recipies from "./Component/Recipes";
import Register from "./Component/Register";
import UserAccout from "./Component/UserAccount/UserAccout";
import Fridge from "./Component/Fridge/Fridge";
import MealPlanner from "./Component/MealPlanner/MealPlanner";
// React
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useEffect, useState, createContext, useContext } from "react";
import { IUser } from "./Interface/userData";

const UserContext: IUserContext | any = createContext({});
export const IngredientsContext = createContext(null);

interface IUserContext {
  userData: IUser;
  setUser: React.Dispatch<IUser>;
  isConnected: boolean;
}

export const useUserContext = () => {
  const {
    userData: data,
    setUser: setData,
    isConnected,
  }: IUserContext = useContext(UserContext);
  return { data, setData, isConnected };
};

export const useIngContext = () => {
  return useContext(IngredientsContext);
};

const urlDb = "http://localhost:4001/user";

const updateUserDb = async (userData) => {
  const res = await fetch(`${urlDb}/${userData.id}`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  const data = await res.json();
  return data;
};

const requestUserDb = async (id: number) => {
  const res = await fetch(`${urlDb}/${id}`);
  const data = res.json();
  return data;
};

function App() {
  const [userData, setUser] = useState<any>({});
  const isConnected = Object.keys(userData).length > 0;

  useEffect(() => {
    //Normaly there is one key in localStorage
    const handleRemeberMe = async () => {
      const key = Object.keys(localStorage)[0];
      const res = localStorage[key];
      if (!res) return;
      const userId = JSON.parse(res);
      const userConfig: IUser = await requestUserDb(userId);
      setUser({ ...userConfig });
    };
    handleRemeberMe();
  }, []);

  //Test Memo

  useEffect(() => {
    const updateDbData = () => {
      if (Object.keys(userData).length < 1) return;
      updateUserDb(userData);
    };
    updateDbData();
  }, [userData]);

  return (
    <>
      <BrowserRouter>
        <UserContext.Provider value={{ userData, setUser, isConnected }}>
          <IngredientsContext.Provider value={userData.ingredients || {}}>
            <Header />

            <div className="component-container">
              <Routes>
                <Route path="/" />
                <Route
                  path="/Recipies"
                  element={(<Recipies />) as JSX.Element}
                />
                {isConnected ? (
                  <Route path={`${userData.pseudo}`} element={<UserAccout />} />
                ) : (
                  <Route path="/Login" element={<Login />} />
                )}
                <Route path="/Register" element={<Register />} />
                <Route path="/Fridge" element={<Fridge />} />
                <Route path="/MealPlanner" element={<MealPlanner />} />
              </Routes>
            </div>
          </IngredientsContext.Provider>
        </UserContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
