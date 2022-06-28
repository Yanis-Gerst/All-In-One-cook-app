import { createPortal } from "react-dom";
import { cloneElement } from "react";
import { useEffect, useRef } from "react";

const Modale = ({ children, toClose }) => {
  const newChildren = cloneElement(children, { toClose });

  const handleShortcut = (e) => {
    if (e.key === "Escape") {
      toClose();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleShortcut);

    return () => {
      window.removeEventListener("keydown", handleShortcut);
    };
  }, []);
  return createPortal(
    <div className="modale-container">{newChildren}</div>,
    document.body
  );
};

export default Modale;
