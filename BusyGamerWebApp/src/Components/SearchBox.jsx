import React, { useEffect, useRef, useState } from "react";
import ReactDom from "react-dom";

export default function SearchBox({ open, onClose, valueSearched }) {
  const [value, setValue] = useState("");
  const searchBarRef = useRef(null);

  useEffect(() => {
    if (open && searchBarRef.current) {
      searchBarRef.current.focus();
    }
  }, [open]);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const onSearch = (event) => {
    event.preventDefault();

    if (value === "") {
      console.log("Nothing Searched");
    } else {
      valueSearched(value);
      setValue("");
      onClose();
    }
  };

  if (!open) return null;

  return ReactDom.createPortal(
    <>
      <div
        className="fixed bottom-0 left-0 right-0 top-0 z-10 flex h-screen w-screen animate-fade-in justify-center bg-black bg-opacity-70 pt-32 backdrop-blur-md"
        onClick={onClose}
      >
        <div
          className="z-20 h-14 w-4/5 rounded-xl bg-app-main drop-shadow-3xl"
          onClick={(e) => e.stopPropagation()}
        >
          <form onSubmit={onSearch}>
            <input
              type="text"
              className="h-14 w-full rounded-xl bg-app-main pl-6 text-2xl font-extrabold text-white outline-none transition-all placeholder:text-2xl placeholder:font-extrabold placeholder:text-app-grey focus:border-b-[1px] focus:border-opacity-50"
              placeholder="WHAT ARE WE PLAYING NEXT?"
              value={value}
              onChange={onChange}
              ref={searchBarRef}
            />
            <button
              className="relative -top-11 right-6 float-right cursor-pointer text-2xl text-app-grey"
              type="submit"
            >
               SEARCH
            </button>
          </form>
        </div>
      </div>
    </>,
    document.getElementById("portal"),
  );
}
