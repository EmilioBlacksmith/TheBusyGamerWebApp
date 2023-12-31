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
      <div className="sticky top-0 z-10 flex h-24 w-5/6 flex-row items-center justify-between rounded-b-xl bg-app-secondary p-8 drop-shadow-3xl">
        <div className="text-4xl font-bold">
          <a
            href="/"
            className="transition-all duration-150 ease-in-out hover:cursor-pointer hover:text-app-complementary hover:drop-shadow-3xl"
          >
            󱑔 The Busy Gamer
          </a>
          <a className="pl-8 text-sm font-thin text-app-grey">
            I can only play 2 hours... :(
          </a>
        </div>
        <div className="flex flex-row gap-3">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-md bg-app-complementary text-xl drop-shadow-3xl transition-all duration-150 ease-in-out hover:scale-105 hover:cursor-pointer"
            onClick={toggleModal}
          >
            
          </div>
          <div
            className="flex h-10 w-10 items-center rounded-md bg-app-complementary pl-3 text-lg drop-shadow-3xl transition-all duration-150 ease-in-out hover:scale-105 hover:cursor-pointer"
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
          <div className="text-xl font-bold">ABOUT.</div>
          <p className="text-justify">
            The Busy Gamer App, allows you to track the videogames that you want
            to play, and it helps you to calculate approximately how long it's
            going to take you to finish all those games. (not everyone can play
            more than 2 hours a day :c )
          </p>
          <div className="text-xl font-bold">HOW IT WORKS?</div>
          <div className="pl-8">
            <ol className="flex list-decimal flex-col gap-2">
              <li>
                Search the game you want to track, by clicking on the  button
                on the top-right corner.
              </li>
              <li>Hover and click the game card you want to track/play.</li>
              <li>
                Open the tracking section on the left, by clicking the 󰞔 button
                on the top-left corner, or the entirety of the left box/section.
              </li>
              <li>
                Define your gaming schedule on the form "How Long Can You Play
                tho?", by adding your daily or weekly schedule and define your
                focus, either focus on main story, story + extras or
                completionist.
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
