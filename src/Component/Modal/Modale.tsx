import React from 'react';
import { createPortal } from 'react-dom';
import { cloneElement } from 'react';
import { useEffect } from 'react';

export interface Props {
  children: React.ReactElement;
  toClose: () => void;
}

export const Modal = ({ children, toClose }: Props) => {
  const newChildren = cloneElement(children, { toClose });

  const handleShortcut = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      toClose();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleShortcut);

    return () => {
      window.removeEventListener('keydown', handleShortcut);
    };
  }, []);

  return createPortal(
    <div className="fixed top-0 bottom-0 left-0 right-0 backdrop-blur-sm flex flex-col items-center gap-2">
      {newChildren}
    </div>,
    document.body
  );
};
