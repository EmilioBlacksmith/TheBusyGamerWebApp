import React from "react";
import ReactDom from "react-dom";

interface ModalProps {
  open: boolean;
  children: React.ReactNode;
  onClose: () => void;
}

export default function Modal({ open, children, onClose }: ModalProps) {
  if (!open) return null;

  return ReactDom.createPortal(
    <>
      <div
        className="fixed bottom-0 left-0 right-0 top-0 z-10 flex h-screen w-screen animate-fade-in justify-center bg-black bg-opacity-50 pt-8 backdrop-blur-sm md:pt-32"
        onClick={onClose}
      >
        <div
          className="z-10 flex h-max w-11/12 flex-col rounded-xl bg-white p-4 text-justify text-black md:w-1/2 md:gap-4 md:p-8"
          onClick={(e) => e.stopPropagation()}
        >
          {children}
          <button
            className="h-10 w-32 rounded-md bg-app-complementary text-lg font-bold text-white"
            onClick={onClose}
          >
            CLOSE
          </button>
        </div>
      </div>
    </>,
    document.getElementById("portal"),
  );
}
