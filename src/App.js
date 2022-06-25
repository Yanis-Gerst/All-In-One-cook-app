//Components
import Header from "./Component/Header";
import Login from "./Component/Login";
import Recipies from "./Component/Recipies";
import Register from "./Component/Register";
import UserAccout from "./Component/UserData/UserAccout";
import Fridge from "./Component/UserData/Fridge";
import MealPanner from "./Component/MealPanner";
// React
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState, createContext, useContext } from "react";

const UserContext = createContext();
export const IngredientsContext = createContext(null);

export const useUserContext = () => {
  const {
    userData: data,
    setUser: setData,
    isConnected,
  } = useContext(UserContext);
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

const requestUserDb = async (id) => {
  const res = await fetch(`${urlDb}/${id}`);
  const data = res.json();
  return data;
};

function App() {
  const [userData, setUser] = useState({});
  const isConnected = Object.keys(userData).length > 0;

  useEffect(() => {
    //Normaly there is one key in localStorage
    const handleRemeberMe = async () => {
      const key = Object.keys(localStorage);
      const res = localStorage[key];
      if (!res) return;
      const userId = JSON.parse(res);
      const userConfig = await requestUserDb(userId);
      setUser({ ...userConfig });
    };
    handleRemeberMe();
  }, []);

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
                <Route exact path="/" />
                <Route exact path="/Recipies" element={<Recipies />} />
                {isConnected ? (
                  <Route
                    exact
                    path={`${userData.pseudo}`}
                    element={
                      <UserAccout userData={userData} setUser={setUser} />
                    }
                  />
                ) : (
                  <Route exac path="/Login" element={<Login />} />
                )}
                <Route exact path="/Register" element={<Register />} />
                <Route exact path="/Fridge" element={<Fridge />} />
                <Route exact path="/MealPlanner" element={<MealPanner />} />
              </Routes>
            </div>
          </IngredientsContext.Provider>
        </UserContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
