import React from "react";

export default function Footer() {
  return (
    <>
      <div className="relative mt-auto flex h-28 w-full justify-center bg-app-secondary drop-shadow-3xl">
        <div className="flex w-5/6 items-center justify-between p-8">
          <div className="flex flex-col gap-1">
            <div className="text-sm font-extralight text-app-grey">
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
            <div className="text-sm font-extralight text-app-grey">
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
          <div className="flex gap-6 text-3xl text-app-grey">
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
