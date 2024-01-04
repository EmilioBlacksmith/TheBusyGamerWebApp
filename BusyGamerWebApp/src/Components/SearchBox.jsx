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
        className="fixed bottom-0 left-0 right-0 top-0 z-10 flex h-screen w-screen animate-fade-in justify-center bg-black bg-opacity-70 pt-12 backdrop-blur-md md:pt-32"
        onClick={onClose}
      >
        <div
          className="z-20 h-14 w-11/12 rounded-xl bg-app-main drop-shadow-3xl md:w-4/5"
          onClick={(e) => e.stopPropagation()}
        >
          <form onSubmit={onSearch}>
            <input
              type="text"
              className="h-14 w-full rounded-xl bg-app-main pl-3 md:pl-6 text-sm font-extrabold text-white outline-none transition-all placeholder:text-sm placeholder:font-extrabold placeholder:text-app-grey focus:border-b-[1px] focus:border-opacity-50 md:text-2xl md:placeholder:text-2xl"
              placeholder="WHAT ARE WE PLAYING NEXT?"
              value={value}
              onChange={onChange}
              ref={searchBarRef}
            />
            <button
              className="relative -top-10 md:-top-11 right-6 float-right cursor-pointer text-base md:text-2xl text-app-grey"
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
