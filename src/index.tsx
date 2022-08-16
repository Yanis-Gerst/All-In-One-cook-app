import React from "react";
import ReactDOM from "react-dom/client";
import "./Css/main.css";
import "./Css/Presentation.css";
import "./Css/modale.css";
import "./Css/recipie.css";
import "./Css/register.css";
import "./Css/userAccount.css";
import "./Css/Fridge.css";
import "./Css/searchBar.css";
import "./Css/header.css";
import "./Css/DropDown.css";
import "./Css/addIngredient.css";
import "./Css/MealPlanner.css";
import "./Css/AddForm.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLDivElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
