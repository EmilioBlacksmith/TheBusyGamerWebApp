import React from "react";
import ReactDom from "react-dom";

export default function Modal({ open, children, onClose }) {
  if (!open) return null;

  return ReactDom.createPortal(
    <>
      <div
        className="fixed bottom-0 left-0 right-0 top-0 z-10 flex h-screen w-screen animate-fade-in justify-center bg-black bg-opacity-50 pt-32 backdrop-blur-sm"
        onClick={onClose}
      >
        <div
          className="z-10 flex h-max w-1/2 flex-col gap-4 rounded-xl bg-white p-8 text-justify text-black"
          onClick={(e) => e.stopPropagation()}
        >
          {children}
          <button
            className="h-10 w-32 rounded-xl bg-app-complementary text-lg font-bold text-white"
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
