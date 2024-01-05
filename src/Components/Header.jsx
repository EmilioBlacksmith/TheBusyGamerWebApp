import React, { useState } from "react";
import Modal from "./Modal";
import SearchBox from "./SearchBox";

export default function Header({ valueSearched }) {
  const [isModalOpen, setModalIsOpen] = useState(false);
  const [isSearchBoxOpen, setSearchBoxIsOpen] = useState(false);

  const toggleModal = () => setModalIsOpen(!isModalOpen);
  const toggleSearch = () => setSearchBoxIsOpen(!isSearchBoxOpen);

  const handleDataSearched = (data) => {
    valueSearched(data);
  };

  return (
    <>
      <div className="md:p8 sticky top-0 z-10 flex h-24 w-full flex-col items-end justify-center gap-2 bg-app-secondary p-4 drop-shadow-3xl md:w-5/6 md:flex-row md:items-center md:justify-between md:rounded-b-xl">
        <div className="flex flex-col items-center text-2xl font-bold md:text-4xl">
          <a
            href="/"
            className="transition-all duration-150 ease-in-out hover:cursor-pointer hover:text-app-complementary hover:drop-shadow-3xl"
          >
            󱑔 The Busy Gamer
          </a>
          <a className="hidden pl-8 text-sm font-thin text-app-grey md:block">
            I can only play 2 hours... :(
          </a>
        </div>
        <div className="flex flex-row gap-3">
          <div
            className="flex h-8 w-8 items-center justify-center rounded-md bg-app-complementary text-xl drop-shadow-3xl transition-all duration-150 ease-in-out hover:scale-105 hover:cursor-pointer md:h-10 md:w-10"
            onClick={toggleModal}
          >
            
          </div>
          <div
            className="flex h-8 w-8 items-center rounded-md bg-app-complementary pl-2 text-lg drop-shadow-3xl transition-all duration-150 ease-in-out hover:scale-105 hover:cursor-pointer md:h-10 md:w-10 md:pl-3"
            onClick={toggleSearch}
          >
            
          </div>
        </div>

        <SearchBox
          open={isSearchBoxOpen}
          onClose={toggleSearch}
          valueSearched={handleDataSearched}
        ></SearchBox>

        <Modal open={isModalOpen} onClose={toggleModal}>
          <div className="font-bold md:text-xl">ABOUT.</div>
          <p className="text-justify text-sm md:text-base">
            The Busy Gamer App, allows you to track the videogames that you want
            to play, and it helps you to calculate approximately how long it's
            going to take you to finish all those games.
          </p>
          <div className="font-bold md:text-xl">HOW IT WORKS?</div>
          <div className="pl-8 text-sm md:text-base">
            <ol className="flex list-decimal flex-col md:gap-2">
              <li>
                Search the game you want to track, by clicking on the  button.
              </li>
              <li>Click the game card you want to track/play.</li>
              <li>
                Open the tracking section on the left, by clicking the 󰞔 button,
                or the entirety of the left box/section.
              </li>
              <li>
                Define your gaming schedule and focus on the form "How Long Can
                You Play tho?".
              </li>
              <li>
                Get the approximation of how long is going to take you to finish
                those games on the bottom of the tracking section.
              </li>
              <li>Play and finish those games, cowboy! 🤠</li>
            </ol>
          </div>
        </Modal>
      </div>
    </>
  );
}
