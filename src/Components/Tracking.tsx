import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import formatHours from "../utils/formatHours";

interface TrackingProps {
  newItemToTrack: any;
  listOfGames: (games: any[]) => void;
}

export default function Tracking({ newItemToTrack, listOfGames }: TrackingProps) {
  // Persistent Local Data
  const [trackingList, setTrackingList] = useState<any[]>(() => {
    const localData = localStorage.getItem("trackingList");
    return localData ? JSON.parse(localData) : [];
  });
  const [hoursAmount, setHoursAmount] = useState<number>(() => {
    const localData = localStorage.getItem("hoursAmount");
    return localData ? parseFloat(localData) : 0;
  });
  const [scheduleType, setScheduleType] = useState<string>(() => {
    const localData = localStorage.getItem("scheduleType");
    return localData ? localData : "daily";
  });
  const [focusType, setFocusType] = useState<string>(() => {
    const localData = localStorage.getItem("focusType");
    return localData ? localData : "gameplayMain";
  });

  const [isActive, setIsActive] = useState<boolean>(true);
  const [longestGame, setLongestGame] = useState<number>(0);
  const [shortestGame, setShortestGame] = useState<number>(0);
  const [timeGameplayMain, setTimeGameplayMain] = useState<number>(0);
  const [timeGameplayMainExtras, setTimeGameplayMainExtras] = useState<number>(0);
  const hoursAmountInput = useRef<number>(0);
  const [displayedResults, setDisplayResults] = useState<string>("");

  const toggleTrackingSection = () => {
    setIsActive(!isActive);
  };

  const addNewItemToList = (item: any) => {
    setTrackingList((prevList) => [...prevList, item]);
  };

  const deleteEntry = (item: any) => {
    setTrackingList((prevList) => prevList.filter((x) => x !== item));
  };

  const containsItem = (item: any) => {
    return trackingList.some((existingItem) => existingItem.id === item.id);
  };

  const getLongestGame = () => {
    if (trackingList.length === 0) {
      return "NOTHING IS GETTING TRACKED... YET 🙊";
    } else {
      const hourList = trackingList.map((item) => item.gameplayMainExtra);
      const max = Math.max(...hourList);
      const longestGame = trackingList.find(
        (item) => item.gameplayMainExtra === max,
      );
      return longestGame ? longestGame.name : "";
    }
  };

  const getShortestGame = () => {
    if (trackingList.length === 0) {
      return "NOTHING IS GETTING TRACKED... YET 🙊";
    } else {
      const hourList = trackingList.map((item) => item.gameplayMain);
      const min = Math.min(...hourList);
      const shortestGame = trackingList.find(
        (item) => item.gameplayMain === min,
      );
      return shortestGame ? shortestGame.name : "";
    }
  };

  const getTimeGameplayMain = () => {
    if (trackingList.length === 0) {
      return "NOTHING IS GETTING TRACKED... YET 🙊";
    } else {
      const hourList = trackingList.map((item) => item.gameplayMain);
      return (
        formatHours(hourList.reduce((partialSum, a) => partialSum + a, 0)) +
        " Hours"
      );
    }
  };

  const getTimeGameplayMainExtras = () => {
    if (trackingList.length === 0) {
      return "NOTHING IS GETTING TRACKED... YET 🙊";
    } else {
      const hourList = trackingList.map((item) => item.gameplayMainExtra);
      return (
        formatHours(hourList.reduce((partialSum, a) => partialSum + a, 0)) +
        " Hours"
      );
    }
  };


  const totalSum = () => {
    switch (focusType) {
      case "gameplayMain":
        const hourListMain = trackingList.map((item) => item.gameplayMain);
        return hourListMain.reduce((accumulator, currentValue) => {
          return accumulator + currentValue;
        }, 0);
        break;
      case "gameplayMainExtra":
        const hourListExtra = trackingList.map(
          (item) => item.gameplayMainExtra,
        );
        return hourListExtra.reduce((accumulator, currentValue) => {
          return accumulator + currentValue;
        }, 0);
        break;
      case "gameplayCompletionist":
        const hourListCompletion = trackingList.map(
          (item) => item.gameplayCompletionist,
        );
        return hourListCompletion.reduce((accumulator, currentValue) => {
          return accumulator + currentValue;
        }, 0);
        break;
    }
  };

  useEffect(() => {
    const totalTime = totalSum();
    let resultsToDisplay = 0;

    switch (scheduleType) {
      case "daily":
        resultsToDisplay = Math.round(totalTime / hoursAmount);
        if (resultsToDisplay === Infinity) resultsToDisplay = 0;
        break;
      case "weekly":
        resultsToDisplay = Math.round(totalTime / (hoursAmount / 7));
        if (resultsToDisplay === Infinity) resultsToDisplay = 0;
        break;
    }

    if (resultsToDisplay >= 365) {
      let years = Math.floor(resultsToDisplay / 365);
      let days = resultsToDisplay % 365;
      setDisplayResults(
        years + " YEAR AND " + days + " DAYS TO FINISH THOSE GAMES 👀",
      );
    } else if (resultsToDisplay < 1) {
      setDisplayResults(
        "I need your schedule to calculate how long is going to take you 🥺",
      );
    } else if (totalTime === 0) {
      setDisplayResults("No videogames in your list, go ahead, track some 🥺");
    } else {
      setDisplayResults(resultsToDisplay + " DAYS TO FINISH THOSE GAMES 👀");
    }
  }, [scheduleType, hoursAmount, focusType, trackingList]);

  useEffect(() => {
    if (Object.keys(newItemToTrack).length === 0) return;

    if (containsItem(newItemToTrack)) {
      toast.error(newItemToTrack.name + " is already being tracked... 🥺");
    } else {
      toast.success("Tracking " + newItemToTrack.name);
      addNewItemToList(newItemToTrack);
    }
  }, [newItemToTrack]);

  useEffect(() => {
    setLongestGame(getLongestGame());
    setShortestGame(getShortestGame());
    setTimeGameplayMain(getTimeGameplayMain());
    setTimeGameplayMainExtras(getTimeGameplayMainExtras());
    localStorage.setItem("trackingList", JSON.stringify(trackingList));
    listOfGames(trackingList);
  }, [trackingList]);

  useEffect(() => {
    localStorage.setItem("hoursAmount", hoursAmount);
    localStorage.setItem("scheduleType", scheduleType);
    localStorage.setItem("focusType", focusType);
  }, [hoursAmount, scheduleType, focusType]);

  return (
    <>
      {isActive ? (
        <div
          className="fixed left-0 z-10 h-full w-4 cursor-pointer bg-app-secondary drop-shadow-3xl md:w-12 md:p-2"
          onClick={toggleTrackingSection}
        >
          <div className="mt-2 flex h-8 w-10 cursor-pointer items-center justify-center rounded-md  bg-app-secondary font-black md:h-12 md:w-16 md:pl-1 md:text-2xl">
            󰞔
          </div>
        </div>
      ) : (
        <div
          className="fixed z-10 h-full w-full animate-fade-in bg-black bg-opacity-50 backdrop-blur-md"
          onClick={toggleTrackingSection}
        >
          <div
            className="fixed left-0 z-10 h-full w-11/12  animate-left-in bg-app-secondary drop-shadow-3xl md:w-7/12"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="fixed -right-7 mt-2 flex h-8 w-10 cursor-pointer items-center justify-center rounded-md bg-app-secondary font-black md:-right-10 md:h-12 md:w-16 md:pl-1 md:text-2xl"
              onClick={toggleTrackingSection}
            >
              󰞓
            </div>
            <div className="flex h-full w-full flex-col gap-1 p-4 md:gap-3 md:pl-8 md:pr-8">
              <div className="cursor-default font-extrabold md:text-3xl">
                THIS WILL TAKE A WHILE...
                <div className="h-2 w-full bg-app-complementary md:w-1/2"></div>
              </div>
              <div className="flex h-8 w-full cursor-default flex-row justify-center md:h-12">
                <div className="flex h-full w-2/6 items-center justify-center rounded-lg bg-app-secondary-dark text-xs font-bold drop-shadow-3xl md:text-base">
                  TITLE
                </div>
                <div className="flex h-full w-4/6 flex-row justify-center gap-3 md:gap-6">
                  <div className="flex w-28 items-center justify-center rounded-lg bg-app-complementary text-xs font-bold drop-shadow-3xl md:w-40 md:text-base">
                    STORY
                  </div>
                  <div className="flex w-28 items-center justify-center rounded-lg bg-app-complementary text-xs font-bold drop-shadow-3xl md:w-40 md:text-base">
                    +EXTRAS
                  </div>
                  <div className="flex w-28 items-center justify-center rounded-lg bg-app-complementary text-xs font-bold drop-shadow-3xl md:w-40 md:text-base">
                    COMPLETIONIST
                  </div>
                </div>
              </div>
              <div id="gameListSection" className="h-64 w-full overflow-auto">
                {trackingList.length !== 0 ? (
                  trackingList.map((item) => (
                    <div
                      className="mb-3 flex h-8 w-full cursor-default flex-row rounded-lg bg-app-secondary-dark drop-shadow-sm md:h-12"
                      key={item.id}
                    >
                      <div className="flex h-full w-2/6 items-center pl-1 text-xs font-bold md:pl-2 md:text-base">
                        <p className="truncate">{item.name}</p>
                      </div>
                      <div className="flex h-full w-4/6 flex-row justify-center gap-3 truncate text-center text-xs font-semibold text-app-grey md:gap-6 md:text-lg">
                        <div className="flex w-28 items-center justify-center md:w-40">
                          {formatHours(item.gameplayMain)} Hours
                        </div>
                        <div className="flex w-28 items-center justify-center md:w-40">
                          {formatHours(item.gameplayMainExtra)} Hours
                        </div>
                        <div className="flex w-28 items-center justify-center md:w-40">
                          {formatHours(item.gameplayCompletionist)} Hours
                        </div>
                      </div>
                      <div
                        className="fixed right-0 top-0 flex h-full w-4 cursor-pointer items-center rounded-lg bg-red pl-0.5 drop-shadow-3xl md:w-10 md:pl-2.5 md:text-2xl"
                        onClick={() => {
                          deleteEntry(item);
                        }}
                      >
                        
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-app-grey">
                    Nothing is getting tracked... yet 😏
                  </p>
                )}
              </div>
              <div id="generalPurposeDataSection">
                <div className="flex h-28 w-full cursor-default justify-between md:h-32">
                  <div className="flex w-1/6 flex-col items-center justify-center">
                    <div className="flex h-1/3 w-full items-center justify-center rounded-lg bg-app-complementary text-sm md:text-base md:font-bold md:drop-shadow-3xl">
                      SHORTEST
                    </div>
                    <div className="flex h-2/3 w-full items-center justify-center truncate text-xs md:text-center md:text-base">
                      {shortestGame}
                    </div>
                  </div>
                  <div className="flex w-1/6 flex-col items-center justify-center">
                    <div className="flex h-1/3 w-full items-center justify-center rounded-lg bg-app-complementary text-sm md:text-base md:font-bold md:drop-shadow-3xl">
                      LONGEST
                    </div>
                    <div className="flex h-2/3 w-full items-center justify-center truncate text-xs md:text-center md:text-base">
                      {longestGame}
                    </div>
                  </div>
                  <div className="flex w-1/6 flex-col items-center justify-center">
                    <div className="flex h-1/3 w-full items-center justify-center rounded-lg bg-app-complementary text-sm md:text-base md:font-bold md:drop-shadow-3xl">
                      STORY HOURS
                    </div>
                    <div className="flex h-2/3 w-full items-center justify-center truncate text-xs md:text-center md:text-base">
                      {timeGameplayMain}
                    </div>
                  </div>
                  <div className="flex w-1/6 flex-col items-center justify-center">
                    <div className="flex h-1/3 w-full items-center justify-center rounded-lg bg-app-complementary text-sm md:text-base md:font-bold md:drop-shadow-3xl">
                      +EXTRAS HOURS
                    </div>
                    <div className="flex h-2/3 w-full items-center justify-center truncate text-xs md:text-center md:text-base">
                      {timeGameplayMainExtras}
                    </div>
                  </div>
                  <div className="flex w-1/6 flex-col items-center justify-center">
                    <div className="flex h-1/3 w-full items-center justify-center rounded-lg bg-app-complementary text-sm md:text-base md:font-bold md:drop-shadow-3xl">
                      GAMES
                    </div>
                    <div className="flex h-2/3 w-full items-center justify-center truncate text-xs md:text-center md:text-base">
                      {trackingList.length}
                    </div>
                  </div>
                </div>
              </div>
              <div id="formSection">
                <div className="cursor-default font-extrabold md:text-3xl">
                  How Long Can You Play tho?
                  <div className="h-2 bg-app-complementary md:w-1/2"></div>
                </div>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                  }}
                >
                  <div className="mt-4 flex h-full w-full flex-col justify-between md:h-12 md:flex-row">
                    <div className="flex h-6 w-full items-center justify-center rounded-md bg-app-secondary-dark text-xs drop-shadow-3xl md:h-full md:w-1/2 md:text-base">
                      <label htmlFor="AmountHours">
                        How many hours can you play?
                      </label>
                    </div>
                    <div className="mt-2 flex h-6 w-full items-center justify-around text-xs md:mt-0 md:h-full md:w-1/2 md:text-base">
                      <input
                        className="h-full w-1/3 rounded-md bg-app-grey text-center text-xs drop-shadow-3xl placeholder:text-app-main focus:border-app-complementary md:text-base"
                        type="number"
                        id="AmountHours"
                        placeholder="00"
                        step={0.5}
                        onChange={(e) => setHoursAmount(e.target.value)}
                        ref={hoursAmountInput}
                        min={0.5}
                        max={scheduleType === "daily" ? 24 : 168}
                        value={hoursAmount}
                      />
                      <div className="flex h-full w-1/2 rounded-md bg-app-grey text-xs drop-shadow-3xl md:text-base">
                        <input
                          type="radio"
                          id="daily"
                          name="typeAmount"
                          value="daily"
                          className="invisible h-0 w-0"
                          onChange={(e) => {
                            setScheduleType(e.target.value);
                          }}
                          checked={scheduleType === "daily"}
                        />
                        <label
                          htmlFor="daily"
                          className="-ml-1 flex h-full w-1/2 cursor-pointer items-center justify-center rounded-md hover:scale-105 hover:outline hover:outline-1 hover:outline-app-secondary hover:drop-shadow-3xl"
                        >
                          DAILY
                        </label>
                        <input
                          type="radio"
                          id="weekly"
                          name="typeAmount"
                          className="invisible h-0 w-0"
                          value="weekly"
                          onChange={(e) => {
                            setScheduleType(e.target.value);
                          }}
                          checked={scheduleType === "weekly"}
                        />
                        <label
                          htmlFor="weekly"
                          className="flex h-full w-1/2 cursor-pointer items-center justify-center rounded-md hover:scale-105 hover:outline hover:outline-1 hover:outline-app-secondary hover:drop-shadow-3xl"
                        >
                          WEEKLY
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex h-full w-full flex-col justify-between md:h-12 md:flex-row">
                    <div className="flex h-6 w-full items-center justify-center rounded-md bg-app-secondary-dark text-xs drop-shadow-3xl md:h-full md:w-1/2 md:text-base">
                      <label htmlFor="AmountHours">
                        What are you focused on?
                      </label>
                    </div>
                    <div className="mt-2 flex h-full items-center justify-center gap-4 md:mt-0 md:w-1/2 md:gap-8 ">
                      <div className="flex h-full w-11/12 rounded-md bg-app-grey text-xs drop-shadow-3xl md:text-base">
                        <input
                          type="radio"
                          id="gameplayMain"
                          name="typeFocus"
                          className="invisible h-0 w-0"
                          value="gameplayMain"
                          onChange={(e) => setFocusType(e.target.value)}
                          checked={focusType === "gameplayMain"}
                        />
                        <label
                          htmlFor="gameplayMain"
                          className="-ml-1 flex h-full w-1/2 cursor-pointer items-center justify-center rounded-md hover:scale-105 hover:outline hover:outline-1 hover:outline-app-secondary hover:drop-shadow-3xl"
                        >
                          STORY
                        </label>
                        <input
                          type="radio"
                          id="gameplayMainExtra"
                          name="typeFocus"
                          className="invisible h-0 w-0"
                          onChange={(e) => setFocusType(e.target.value)}
                          value="gameplayMainExtra"
                          checked={focusType === "gameplayMainExtra"}
                        />
                        <label
                          htmlFor="gameplayMainExtra"
                          className="flex h-full w-1/2 cursor-pointer items-center justify-center rounded-md hover:scale-105 hover:outline hover:outline-1 hover:outline-app-secondary hover:drop-shadow-3xl"
                        >
                          +EXTRAS
                        </label>
                        <input
                          type="radio"
                          id="gameplayCompletionist"
                          name="typeFocus"
                          className="invisible h-0 w-0"
                          onChange={(e) => setFocusType(e.target.value)}
                          value="gameplayCompletionist"
                          checked={focusType === "gameplayCompletionist"}
                        />
                        <label
                          htmlFor="gameplayCompletionist"
                          className="flex h-full w-1/2 cursor-pointer items-center justify-center rounded-md hover:scale-105 hover:outline hover:outline-1 hover:outline-app-secondary hover:drop-shadow-3xl"
                        >
                          COMPLETIONIST
                        </label>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              <div id="resultsSection">
                <div className="mt-4 cursor-default text-sm font-extrabold md:mt-6 md:text-3xl">
                  Based in your time (quit your job)
                  <div className="h-2 w-full bg-app-complementary md:w-1/2"></div>
                </div>
                <p className="cursor-default text-xs md:text-sm">
                  Based in your time, this would be the overview of how long it
                  will take you to finish those sweet sweet games of yours...
                </p>
                <div className="mt-4 flex h-fit w-full cursor-default items-center justify-end text-center text-xs font-bold text-white md:mt-0 md:h-1/2 md:text-xl">
                  <div className="flex h-full w-2/4 items-center justify-center rounded-2xl bg-app-complementary p-2 drop-shadow-3xl">
                    {displayedResults}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
