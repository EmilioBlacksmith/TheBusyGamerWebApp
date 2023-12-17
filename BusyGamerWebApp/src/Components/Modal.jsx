import React from 'react';
import ReactDom from 'react-dom';

export default function Modal({ open, children, onClose }) {
  if (!open) return null;

  return ReactDom.createPortal(
    <>
      <div className="fixed top-0 right-0 left-0 bottom-0 w-screen h-screen bg-opacity-50 backdrop-blur-sm bg-black z-10 flex justify-center pt-32 ">
        <div className="w-1/2 h-max bg-white p-8 z-10 text-black rounded-xl flex flex-col gap-4 text-justify">
          {children}
          <button
            className="w-32 h-10 text-lg font-bold bg-app-complementary text-white rounded-xl"
            onClick={onClose}
          >
            CLOSE
          </button>
        </div>
      </div>
    </>,
    document.getElementById('portal')
  );
}
