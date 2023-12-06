import React, { useState } from "react";
import Modal from "./Modal";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => setIsOpen(!isOpen);

  return (
    <>
      <div className="sticky top-0 z-10 flex h-24 w-5/6 flex-row items-center justify-between rounded-b-xl bg-app-secondary p-8 drop-shadow-lg">
        <div className="text-4xl font-bold">
          <a
            href="/"
            className="hover:cursor-pointer hover:text-app-complementary transition-all ease-in-out duration-150"
          >
            The Busy Gamer
          </a>
          <a className="pl-8 text-sm font-thin text-app-grey">
            I can only play 2 hours... :(
          </a>
        </div>
        <div className="flex flex-row gap-3">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-md bg-app-complementary text-xl drop-shadow-md hover:scale-105 hover:cursor-pointer transition-all ease-in-out duration-150"
            onClick={toggleModal}
          >
            
          </div>
          <div className="flex h-10 w-10 items-center rounded-md bg-app-complementary pl-3 text-lg drop-shadow-md hover:scale-105 hover:cursor-pointer transition-all ease-in-out duration-150">
            
          </div>
        </div>

        <Modal open={isOpen} onClose={toggleModal}>
          <div className="text-xl font-bold">ABOUT.</div>
          <div>
            The Busy Gamer App, allows you to track the videogames that you want
            to play, and it helps you to calculate approximately how long it's
            going to take you to finish all those games. (not everyone can play
            more than 2 hours a day :c )
          </div>
          <div className="text-xl font-bold">HOW IT WORKS?</div>
          <div>idk, lol kill me...</div>
        </Modal>
      </div>
    </>
  );
}
