import { Link } from "react-router-dom";
import { useUserContext } from "../App";

//Icon Import

import { CgSmartHomeRefrigerator } from "react-icons/cg";
import { AiOutlineLogin, AiOutlineHome } from "react-icons/ai";
import { MdOutlineAccountCircle } from "react-icons/md";
import spatulaIcon from "../img/spatulaIcon.png";
import mealPlannerIcon from "../img/mealPlannerIcon.png";

//Opti L'image
const Header = () => {
  const user = useUserContext();
  return (
    <header>
      <div className="icon-container">
        <p>Cook Yanis App</p>
      </div>

      <nav>
        <h4 className="header-tag">Menu</h4>
        <Link to="/">
          <AiOutlineHome className="header-icon" /> Home
        </Link>
        {user.isConnected && (
          <>
            <div className="separator" />
            <Link to="/Recipies">
              <img src={spatulaIcon} className="header-icon" />
              Recipies
            </Link>
          </>
        )}
        <div className="separator"></div>
        <Link to="/MealPlanner">
          <img
            src={mealPlannerIcon}
            alt="mealPlanner"
            className="header-icon"
          />{" "}
          MealPlanner
        </Link>
        <div className="separator"></div>
        <Link to="/Fridge">
          <CgSmartHomeRefrigerator className="header-icon" /> Fridge
        </Link>
        <div className="separator"></div>
        {user.isConnected ? (
          <Link to={`${user.data.pseudo}`}>
            <MdOutlineAccountCircle className="header-icon" />
            Account
          </Link>
        ) : (
          <Link to="/Login">
            <AiOutlineLogin className="header-icon" />
            Login
          </Link>
        )}

        <div className="separator"></div>
      </nav>
    </header>
  );
};

export default Header;
