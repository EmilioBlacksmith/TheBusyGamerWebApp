import React, { useState, useEffect } from "react";

const baseURL = "https://hltb-api.onrender.com/topGames";

export default function Latest({ newItemToAdd, globalGameList }) {
  const [data, setData] = useState([]);
  const [currentGlobalGameList, setGlobalGameList] = useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(baseURL);
        const jsonData = await response.json();
        jsonData.pop();
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setGlobalGameList(globalGameList);
  }, [globalGameList]);

  const formatHours = (hours) => {
    const integerPart = Math.floor(hours);
    const decimalPart = hours - integerPart;

    if (decimalPart === 0.25 || decimalPart === 0.75) {
      return `${integerPart}${decimalPart * 10}`;
    } else if (decimalPart === 0.5) {
      return `${integerPart}½`;
    } else {
      return hours;
    }
  };

  const sendItemToTrack = (item) => {
    newItemToAdd(item);
  };

  const containsItem = (item) => {
    return currentGlobalGameList.some(
      (existingItem) => existingItem.id === item.id,
    );
  };

  return (
    <div className="mb-6 mt-6 flex w-5/6 flex-col gap-4 p-4 md:gap-8">
      <div className="p-2 text-xl font-extrabold md:text-3xl">
        POPULAR RIGHT NOW
        <div className="h-2 w-full bg-app-complementary md:w-1/3"></div>
      </div>
      <div className="mt-4 flex flex-wrap justify-center gap-x-4 gap-y-4 md:justify-between md:gap-x-8 md:gap-y-16">
        {data.map((item) => (
          <div
            key={item.id}
            className="-mt-2 mb-4 h-48 w-32 rounded-xl align-bottom drop-shadow-3xl md:h-80 md:w-64 md:hover:backdrop-blur-3xl"
            onClick={() => {
              sendItemToTrack(item);
            }}
          >
            {containsItem(item) ? (
              <div className="pointer-events-none fixed z-10 flex h-full w-full items-center justify-center rounded-lg bg-black bg-opacity-75 text-center text-xl font-black shadow-xl md:text-2xl">
                TRACKED
              </div>
            ) : (
              <></>
            )}
            <img
              src={item.imageUrl}
              alt={item.name}
              className="fixed h-full w-full rounded-xl object-cover"
            />
            <div className="hidden h-full w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-lg bg-black bg-opacity-75 p-2 text-center opacity-0 outline outline-1 outline-app-complementary drop-shadow-3xl backdrop-blur-md transition-all duration-200 ease-in-out hover:opacity-100 md:flex">
              {!containsItem(item) ? (
                <div className="absolute top-0 -mt-4 flex h-10 w-10 items-center justify-center rounded-full bg-app-complementary text-xl font-black">
                  +
                </div>
              ) : (
                <></>
              )}
              <div className="text-2xl font-bold">{item.name}</div>
              <div className="-mb-3 text-sm font-semibold">Main Story:</div>
              <div className="text-lg font-thin">
                {formatHours(item.gameplayMain)} Hours
              </div>
              <div className="-mb-3 text-sm font-semibold">Main + Extra:</div>
              <div className="text-lg font-thin">
                {formatHours(item.gameplayMainExtra)} Hours
              </div>
              <div className="-mb-3 text-sm font-semibold">Completionist:</div>
              <div className="text-lg font-thin">
                {formatHours(item.gameplayCompletionist)} Hours
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
