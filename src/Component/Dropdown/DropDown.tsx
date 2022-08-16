import useToogle from "../../CustomHook/useToogle";
import React, { cloneElement, useRef } from "react";
import { useEffect } from "react";

interface Props {
  children: React.ReactNode;
  title: React.ReactElement;
  style?: object;
}

const DropDown = ({ children, title, style = {} }: Props) => {
  const [showMenu, toogleShowMenu] = useToogle(false);
  const [byBlur, toogleByBlur] = useToogle(false);
  const dropdownMenu = useRef<HTMLDivElement>(null);
  const dropdownButton = useRef<HTMLDivElement>(null);

  const handleBlur = (e: React.FocusEvent): void => {
    if (e.currentTarget.contains(e.relatedTarget)) return;
    toogleByBlur();
    toogleShowMenu();
    //The setTimeout is for prevent the bug with click and blur event
    setTimeout(toogleByBlur, 200);
  };

  const handleClick = (): void => {
    if (byBlur) return;
    toogleShowMenu();
  };

  useEffect(() => {
    if (!showMenu) return;
    if (!dropdownMenu.current) return;
    dropdownMenu.current.focus();
  }, [showMenu]);

  const titleElement = cloneElement(title);

  return (
    <>
      <div className="dropdown-container" tabIndex={0} style={style}>
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
            tabIndex={0}
          >
            {children}
          </div>
        )}
      </div>
    </>
  );
};

export default DropDown;
