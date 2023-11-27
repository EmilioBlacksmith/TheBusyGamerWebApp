import React, { useState } from "react";
import Modal from "./Modal";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => setIsOpen(!isOpen);

  return (
    <>
      <div className="w-5/6 h-24 rounded-b-xl bg-app-secondary drop-shadow-md sticky top-0 flex flex-row items-center justify-between p-8">
        <div className="text-4xl font-bold">
          <a
            href="/"
            className="hover:text-app-complementary hover:cursor-pointer"
          >
            The Busy Gamer
          </a>
          <a className="text-sm font-thin text-app-grey pl-8">
            I can only play 2 hours... :(
          </a>
        </div>
        <div className="flex flex-row gap-3">
          <div
            className="bg-app-complementary h-10 w-10 rounded-md items-center justify-center flex text-xl drop-shadow-md hover:cursor-pointer hover:scale-105"
            onClick={toggleModal}
          >
            
          </div>
          <div className="bg-app-complementary h-10 w-10 rounded-md items-center pl-3 flex text-lg drop-shadow-md hover:cursor-pointer hover:scale-105">
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
