import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";

export default function Tracking({ newItemToTrack, listOfGames }) {
  // Persistent Local Data
  const [trackingList, setTrackingList] = useState(() => {
    const localData = localStorage.getItem("trackingList");
    return localData ? JSON.parse(localData) : [];
  });
  const [hoursAmount, setHoursAmount] = useState(() => {
    const localData = localStorage.getItem("hoursAmount");
    return localData ? parseFloat(localData) : 0;
  });
  const [scheduleType, setScheduleType] = useState(() => {
    const localData = localStorage.getItem("scheduleType");
    return localData ? localData : "daily";
  });
  const [focusType, setFocusType] = useState(() => {
    const localData = localStorage.getItem("focusType");
    return localData ? localData : "gameplayMain";
  });

  const [isActive, setIsActive] = useState(true);
  const [longestGame, setLongestGame] = useState(0);
  const [shortestGame, setShortestGame] = useState(0);
  const [timeGameplayMain, setTimeGameplayMain] = useState(0);
  const [timeGameplayMainExtras, setTimeGameplayMainExtras] = useState(0);
  const hoursAmountInput = useRef(0);
  const [displayedResults, setDisplayResults] = useState("");

  const toggleTrackingSection = () => {
    setIsActive(!isActive);
  };

  const addNewItemToList = (item) => {
    setTrackingList((prevList) => [...prevList, item]);
  };

  const deleteEntry = (item) => {
    setTrackingList((prevList) => prevList.filter((x) => x !== item));
  };

  const containsItem = (item) => {
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
      setDisplayResults(
        "No videogames in your list, go ahead, track some 🥺",
      );
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
          className="fixed left-0 z-10 h-full w-12 cursor-pointer bg-app-secondary p-2 drop-shadow-3xl"
          onClick={toggleTrackingSection}
        >
          <div className="pointer-events-none mt-2 flex h-12 w-16 cursor-pointer items-center  justify-center rounded-md bg-app-secondary pl-1 text-2xl font-black">
            󰞔
          </div>
        </div>
      ) : (
        <div
          className="fixed z-10 h-full w-full animate-fade-in bg-black bg-opacity-50 backdrop-blur-md"
          onClick={toggleTrackingSection}
        >
          <div
            className="fixed left-0 z-10 h-full w-7/12 animate-left-in bg-app-secondary drop-shadow-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="fixed -right-10 mt-2 flex h-12 w-16 cursor-pointer items-center justify-center  rounded-md bg-app-secondary pl-1 text-2xl font-black"
              onClick={toggleTrackingSection}
            >
              󰞓
            </div>
            <div className=" flex h-full w-full flex-col gap-3 p-4 pl-8 pr-8">
              <div className="cursor-default text-3xl font-extrabold">
                THIS WILL TAKE A WHILE...
                <div className="h-2 w-1/2 bg-app-complementary"></div>
              </div>
              <div className="flex h-12 w-full cursor-default flex-row">
                <div className="flex h-full w-2/6 items-center justify-center rounded-lg bg-app-secondary-dark text-base font-bold drop-shadow-3xl">
                  TITLE
                </div>
                <div className="flex h-full w-4/6 flex-row justify-center gap-6">
                  <div className="flex w-40 items-center justify-center rounded-lg bg-app-complementary text-base font-bold drop-shadow-3xl">
                    MAIN STORY
                  </div>
                  <div className="flex w-40 items-center justify-center rounded-lg bg-app-complementary text-center text-base font-bold drop-shadow-3xl">
                    STORY + EXTRAS
                  </div>
                  <div className="flex w-40 items-center justify-center rounded-lg bg-app-complementary text-base font-bold drop-shadow-3xl">
                    COMPLETIONIST
                  </div>
                </div>
              </div>
              <div id="gameListSection" className="h-64 w-full overflow-auto">
                {trackingList.length !== 0 ? (
                  trackingList.map((item) => (
                    <div
                      className="mb-3 flex h-12 w-full cursor-default flex-row rounded-lg bg-app-secondary-dark drop-shadow-sm"
                      key={item.id}
                    >
                      <div className="flex h-full w-2/6 items-center pl-2 font-bold">
                        <p className="truncate">{item.name}</p>
                      </div>
                      <div className="flex h-full w-4/6 flex-row justify-center gap-6 truncate text-center text-lg font-semibold text-app-grey">
                        <div className="flex w-40 items-center justify-center">
                          {formatHours(item.gameplayMain)} Hours
                        </div>
                        <div className="flex w-40 items-center justify-center">
                          {formatHours(item.gameplayMainExtra)} Hours
                        </div>
                        <div className="flex w-40 items-center justify-center">
                          {formatHours(item.gameplayCompletionist)} Hours
                        </div>
                      </div>
                      <div
                        className="fixed right-0 top-0 flex h-full w-10 cursor-pointer items-center rounded-lg bg-red pl-2.5 text-2xl drop-shadow-3xl"
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
                <div className="flex h-32 w-full cursor-default justify-between">
                  <div className="flex w-1/6 flex-col items-center justify-center">
                    <div className="flex h-1/3 w-full items-center justify-center rounded-lg bg-app-complementary text-base font-bold drop-shadow-3xl">
                      SHORTEST GAME
                    </div>
                    <div className="flex h-2/3 w-full items-center justify-center text-center">
                      {shortestGame}
                    </div>
                  </div>
                  <div className="flex w-1/6 flex-col items-center justify-center">
                    <div className="flex h-1/3 w-full items-center justify-center rounded-lg bg-app-complementary text-base font-bold drop-shadow-3xl">
                      LONGEST GAME
                    </div>
                    <div className="flex h-2/3 w-full items-center justify-center text-center">
                      {longestGame}
                    </div>
                  </div>
                  <div className="flex w-1/6 flex-col items-center justify-center">
                    <div className="flex h-1/3 w-full items-center justify-center rounded-lg bg-app-complementary text-center text-sm font-bold drop-shadow-3xl">
                      MAIN STORY HOURS
                    </div>
                    <div className="flex h-2/3 w-full items-center justify-center text-center">
                      {timeGameplayMain}
                    </div>
                  </div>
                  <div className="flex w-1/6 flex-col items-center justify-center">
                    <div className="flex h-1/3 w-full items-center justify-center rounded-lg bg-app-complementary text-center text-sm font-bold drop-shadow-3xl">
                      STORY + EXTRAS HOURS
                    </div>
                    <div className="flex h-2/3 w-full items-center justify-center text-center">
                      {timeGameplayMainExtras}
                    </div>
                  </div>
                  <div className="flex w-1/6 flex-col items-center justify-center">
                    <div className="flex h-1/3 w-full items-center justify-center rounded-lg bg-app-complementary text-base font-bold drop-shadow-3xl">
                      HOW MANY GAMES
                    </div>
                    <div className="flex h-2/3 w-full items-center justify-center text-center">
                      {trackingList.length}
                    </div>
                  </div>
                </div>
              </div>
              <div id="formSection">
                <div className="cursor-default text-3xl font-extrabold">
                  How Long Can You Play tho?
                  <div className="h-2 w-1/2 bg-app-complementary"></div>
                </div>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                  }}
                >
                  <div className="mt-4 flex h-12 w-full flex-row justify-between">
                    <div className="flex h-full w-1/2 items-center justify-center rounded-md bg-app-secondary-dark drop-shadow-3xl">
                      <label htmlFor="AmountHours">
                        How many hours can you play?
                      </label>
                    </div>
                    <div className="flex h-full w-1/2 items-center justify-around">
                      <input
                        className="h-full w-1/3 rounded-md bg-app-grey text-center drop-shadow-3xl placeholder:text-app-main focus:border-app-complementary"
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
                      <div className="flex h-full w-1/2 rounded-md bg-app-grey drop-shadow-3xl">
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
                  <div className="mt-4 flex h-12 w-full flex-row justify-between">
                    <div className="flex h-full w-1/2 items-center justify-center rounded-md bg-app-secondary-dark drop-shadow-3xl">
                      <label htmlFor="AmountHours">
                        What are you focused on?
                      </label>
                    </div>
                    <div className="flex h-full w-1/2 items-center justify-center gap-8">
                      <div className="flex h-full w-11/12 rounded-md bg-app-grey drop-shadow-3xl">
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
                          MAIN STORY
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
                          STORY + EXTRAS
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
                <div className="mt-6 cursor-default text-3xl font-extrabold">
                  Based in your time (quit your job)
                  <div className="h-2 w-1/2 bg-app-complementary"></div>
                </div>
                <p className="cursor-default">
                  Based in your time, this would be the overview of how long it
                  will take you to finish those sweet sweet games of yours...
                </p>
                <div className="flex h-1/2 w-full cursor-default items-center justify-end text-center text-xl font-bold text-white">
                  <div className="flex h-full w-2/4 items-center justify-center rounded-2xl bg-app-complementary drop-shadow-3xl p-2">
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
