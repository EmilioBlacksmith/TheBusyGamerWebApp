import React from "react";

export default function Footer() {
  return (
    <>
      <div className="relative mt-auto flex h-fit w-full justify-center bg-app-secondary drop-shadow-3xl md:h-28">
        <div className="flex w-full flex-col items-center justify-center p-4 md:w-5/6 md:flex-row md:justify-between md:p-8">
          <div className="flex flex-col text-center md:gap-1 md:text-justify">
            <div className="text-xs font-extralight text-app-grey md:text-sm">
              Developed by{" "}
              <a
                href="https://emilioblacksmith.github.io/"
                target="_blank"
                className=" text-white hover:text-app-complementary"
              >
                Emilio (Blackmsith)
              </a>{" "}
              || so many games, so little time...
            </div>
            <div className="text-xs font-extralight text-app-grey md:text-sm">
              The Busy Gamer App (2023) • Powered By{" "}
              <a
                href="https://howlongtobeat.com/"
                target="_blank"
                className="text-white hover:text-app-complementary"
              >
                HowLongToBeat
              </a>{" "}
              • v1.0 • GPL-3.0 license
            </div>
          </div>
          <div className="flex gap-3 text-xl text-app-grey md:gap-6 md:text-3xl">
            <a
              href="https://www.instagram.com/emilioblacksmith/"
              target="_blank"
              className="hover:text-app-complementary"
            >
              󰋾
            </a>
            <a
              href="https://www.youtube.com/channel/UC1ZeE2i5QwVwhWOV-HveneQ"
              target="_blank"
              className="hover:text-app-complementary"
            >
              󰗃
            </a>
            <a
              href="https://github.com/EmilioBlacksmith/theBusyGamer"
              target="_blank"
              className="hover:text-app-complementary"
            >
              
            </a>
            <a
              href="https://www.twitch.tv/emilioblacksmith"
              target="_blank"
              className="hover:text-app-complementary"
            >
              
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
