import React from "react";
import { createPortal } from "react-dom";
import { cloneElement } from "react";
import { useEffect } from "react";

export interface Props {
  children: React.ReactElement;
  toClose: () => void;
}

const Modal = ({ children, toClose }: Props) => {
  const newChildren = cloneElement(children, { toClose });

  const handleShortcut = (e: KeyboardEvent) => {
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

export default Modal;
