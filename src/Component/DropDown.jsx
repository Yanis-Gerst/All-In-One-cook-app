import useToogle from "../CustomHook/useToogle";
import { cloneElement, useRef } from "react";
import { useEffect } from "react";

const DropDown = ({ children, title, style = {} }) => {
  const [showMenu, toogleShowMenu] = useToogle(false);
  const [byBlur, toogleByBlur] = useToogle(false);
  const dropdownMenu = useRef(null);
  const dropdownButton = useRef(null);

  const handleBlur = (e) => {
    if (e.currentTarget.contains(e.relatedTarget)) return;
    toogleByBlur();
    toogleShowMenu();
    //The setTimeout is for prevent the bug with click and blur event
    setTimeout(toogleByBlur, 200);
  };

  const handleClick = () => {
    if (byBlur) return;
    toogleShowMenu();
  };

  useEffect(() => {
    if (!showMenu) return;
    dropdownMenu.current.focus();
  }, [showMenu]);

  const titleElement = cloneElement(title);

  return (
    <>
      <div className="dropdown-container" tabIndex={"0"} style={style}>
        <div
          className="dropdown-title"
          onClick={handleClick}
          ref={dropdownButton}
        >
          {titleElement}
        </div>
        {showMenu && (
          <div
            className="dropdown-menu"
            ref={dropdownMenu}
            onBlur={handleBlur}
            tabIndex="0"
          >
            {children}
          </div>
        )}
      </div>
    </>
  );
};

export default DropDown;
