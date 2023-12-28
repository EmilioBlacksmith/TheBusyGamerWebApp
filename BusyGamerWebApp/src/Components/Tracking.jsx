import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";

export default function Tracking({ newItemToTrack, listOfGames }) {
	// Persisten Local Data
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
				(item) => item.gameplayMainExtra === max
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
				(item) => item.gameplayMain === min
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

	const handleSubmit = (e) => {
		e.preventDefault();
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
					(item) => item.gameplayMainExtra
				);
				return hourListExtra.reduce((accumulator, currentValue) => {
					return accumulator + currentValue;
				}, 0);
				break;
			case "gameplayCompletionist":
				const hourListCompletion = trackingList.map(
					(item) => item.gameplayCompletionist
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
				years + " YEAR AND " + days + " DAYS TO FINISH THOSE GAMES 👀"
			);
		} else if (resultsToDisplay < 1) {
			setDisplayResults(
				"I need your schedule to calculate how long is going to take you 🥺"
			);
		} else {
			setDisplayResults(resultsToDisplay + " DAYS TO FINISH THOSE GAMES 👀");
		}
	}, [scheduleType, hoursAmount, focusType, trackingList]);

	useEffect(() => {
		if (Object.keys(newItemToTrack).length === 0) {
			return;
		}

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
		const storedHoursAmount = localStorage.getItem("hoursAmount");
		const storedScheduleType = localStorage.getItem("scheduleType");
		const storedFocusType = localStorage.getItem("focusType");

		setHoursAmount(storedHoursAmount ? parseFloat(storedHoursAmount) : 0);
		setScheduleType(storedScheduleType || "daily");
		setFocusType(storedFocusType || "gameplayMain");
	}, []);

	useEffect(() => {
		localStorage.setItem("hoursAmount", hoursAmount);
		localStorage.setItem("scheduleType", scheduleType);
		localStorage.setItem("focusType", focusType);
	}, [hoursAmount, scheduleType, focusType]);

	return (
		<>
			{isActive ? (
				<div
					className="fixed left-0 h-full w-12 p-2 bg-app-secondary z-10 drop-shadow-3xl cursor-pointer"
					onClick={toggleTrackingSection}
				>
					<div className="text-2xl font-black w-16 h-12 mt-2 rounded-md bg-app-secondary  cursor-pointer flex items-center justify-center pl-1 pointer-events-none">
						󰞔
					</div>
				</div>
			) : (
				<div
					className="fixed h-full w-full z-10 bg-black backdrop-blur-md bg-opacity-50 animate-fade-in"
					onClick={toggleTrackingSection}
				>
					<div
						className="fixed left-0 h-full w-7/12 bg-app-secondary z-10 drop-shadow-3xl animate-left-in"
						onClick={(e) => e.stopPropagation()}
					>
						<div
							className="fixed text-2xl -right-10 font-black w-16 h-12 mt-2 rounded-md bg-app-secondary  cursor-pointer flex items-center justify-center pl-1"
							onClick={toggleTrackingSection}
						>
							󰞓
						</div>
						<div className=" w-full h-full p-4 flex flex-col gap-3 pl-8 pr-8">
							<div className="text-3xl font-extrabold cursor-default">
								THIS WILL TAKE A WHILE...
								<div className="bg-app-complementary w-1/2 h-2"></div>
							</div>
							<div className="w-full h-12 flex flex-row cursor-default">
								<div className="h-full w-2/6 flex items-center justify-center bg-app-secondary-dark rounded-lg drop-shadow-3xl text-base font-bold">
									TITLE
								</div>
								<div className="flex flex-row h-full w-4/6 justify-center gap-6">
									<div className="flex w-40 items-center justify-center bg-app-complementary rounded-lg drop-shadow-3xl text-base font-bold">
										MAIN STORY
									</div>
									<div className="flex w-40 items-center justify-center text-center bg-app-complementary rounded-lg drop-shadow-3xl text-base font-bold">
										STORY + EXTRAS
									</div>
									<div className="flex w-40 items-center justify-center bg-app-complementary rounded-lg drop-shadow-3xl text-base font-bold">
										COMPLETIONIST
									</div>
								</div>
							</div>
							<div
								id="gameListSection"
								className="w-full h-64 overflow-auto"
							>
								{trackingList.length !== 0 ? (
									trackingList.map((item) => (
										<div
											className="mb-3 w-full h-12 flex flex-row cursor-default bg-app-secondary-dark rounded-lg drop-shadow-sm"
											key={item.id}
										>
											<div className="h-full w-2/6 flex items-center pl-2 font-bold">
												<p className="truncate">{item.name}</p>
											</div>
											<div className="flex flex-row h-full w-4/6 justify-center gap-6 text-center text-app-grey font-semibold text-lg truncate">
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
												className="fixed right-0 top-0 rounded-lg w-10 h-full bg-red pl-2.5 text-2xl drop-shadow-3xl flex items-center cursor-pointer"
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
								<div className="w-full h-32 flex justify-between">
									<div className="flex flex-col items-center w-1/6 justify-center">
										<div className="flex w-full h-1/3 items-center justify-center bg-app-complementary rounded-lg drop-shadow-3xl text-base font-bold">
											SHORTEST GAME
										</div>
										<div className="flex w-full h-2/3 items-center justify-center text-center">
											{shortestGame}
										</div>
									</div>
									<div className="flex flex-col items-center w-1/6 justify-center">
										<div className="flex w-full h-1/3 items-center justify-center bg-app-complementary rounded-lg drop-shadow-3xl text-base font-bold">
											LONGEST GAME
										</div>
										<div className="flex w-full h-2/3 items-center justify-center text-center">
											{longestGame}
										</div>
									</div>
									<div className="flex flex-col items-center w-1/6 justify-center">
										<div className="flex w-full h-1/3 items-center justify-center text-center bg-app-complementary rounded-lg drop-shadow-3xl text-sm font-bold">
											MAIN STORY HOURS
										</div>
										<div className="flex w-full h-2/3 items-center justify-center text-center">
											{timeGameplayMain}
										</div>
									</div>
									<div className="flex flex-col items-center w-1/6 justify-center">
										<div className="flex w-full h-1/3 items-center justify-center text-center bg-app-complementary rounded-lg drop-shadow-3xl text-sm font-bold">
											STORY + EXTRAS HOURS
										</div>
										<div className="flex w-full h-2/3 items-center justify-center text-center">
											{timeGameplayMainExtras}
										</div>
									</div>
									<div className="flex flex-col items-center w-1/6 justify-center">
										<div className="flex w-full h-1/3 items-center justify-center bg-app-complementary rounded-lg drop-shadow-3xl text-base font-bold">
											HOW MANY GAMES
										</div>
										<div className="flex w-full h-2/3 items-center justify-center text-center">
											{trackingList.length}
										</div>
									</div>
								</div>
							</div>
							<div id="formSection">
								<div className="text-3xl font-extrabold cursor-default">
									How Long Can You Play tho?
									<div className="bg-app-complementary w-1/2 h-2"></div>
								</div>
								<form onSubmit={handleSubmit}>
									<div className="flex w-full h-12 flex-row justify-between mt-4">
										<div className="w-1/2 h-full flex items-center justify-center rounded-md bg-app-secondary-dark drop-shadow-3xl">
											<label htmlFor="AmountHours">
												How many hours can you play?
											</label>
										</div>
										<div className="flex w-1/2 h-full items-center justify-around">
											<input
												className="w-1/3 h-full bg-app-grey placeholder:text-app-main rounded-md text-center drop-shadow-3xl focus:border-app-complementary"
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
											<div className="bg-app-grey w-1/2 h-full rounded-md flex drop-shadow-3xl">
												<input
													type="radio"
													id="daily"
													name="typeAmount"
													value="daily"
													className="w-0 h-0 invisible"
													onChange={(e) => {
														setScheduleType(e.target.value);
													}}
													checked={scheduleType === "daily"}
												/>
												<label
													htmlFor="daily"
													className="cursor-pointer w-1/2 h-full rounded-md flex items-center justify-center -ml-1 hover:scale-105 hover:drop-shadow-3xl hover:outline hover:outline-1 hover:outline-app-secondary"
												>
													DAILY
												</label>
												<input
													type="radio"
													id="weekly"
													name="typeAmount"
													className="w-0 h-0 invisible"
													value="weekly"
													onChange={(e) => {
														setScheduleType(e.target.value);
													}}
													checked={scheduleType === "weekly"}
												/>
												<label
													htmlFor="weekly"
													className="cursor-pointer w-1/2 h-full rounded-md flex items-center justify-center hover:scale-105 hover:drop-shadow-3xl hover:outline hover:outline-1 hover:outline-app-secondary"
												>
													WEEKLY
												</label>
											</div>
										</div>
									</div>
									<div className="flex w-full h-12 flex-row justify-between mt-4">
										<div className="w-1/2 h-full flex items-center justify-center rounded-md bg-app-secondary-dark drop-shadow-3xl">
											<label htmlFor="AmountHours">
												What are you focused on?
											</label>
										</div>
										<div className="flex w-1/2 h-full items-center justify-center gap-8">
											<div className="bg-app-grey w-11/12 h-full rounded-md flex drop-shadow-3xl">
												<input
													type="radio"
													id="gameplayMain"
													name="typeFocus"
													className="w-0 h-0 invisible"
													value="gameplayMain"
													onChange={(e) => setFocusType(e.target.value)}
													checked={focusType === "gameplayMain"}
												/>
												<label
													htmlFor="gameplayMain"
													className="cursor-pointer w-1/2 h-full rounded-md flex items-center justify-center -ml-1 hover:scale-105 hover:drop-shadow-3xl hover:outline hover:outline-1 hover:outline-app-secondary"
												>
													MAIN STORY
												</label>
												<input
													type="radio"
													id="gameplayMainExtra"
													name="typeFocus"
													className="w-0 h-0 invisible"
													onChange={(e) => setFocusType(e.target.value)}
													value="gameplayMainExtra"
													checked={focusType === "gameplayMainExtra"}
												/>
												<label
													htmlFor="gameplayMainExtra"
													className="cursor-pointer w-1/2 h-full rounded-md flex items-center justify-center hover:scale-105 hover:drop-shadow-3xl hover:outline hover:outline-1 hover:outline-app-secondary"
												>
													STORY + EXTRAS
												</label>
												<input
													type="radio"
													id="gameplayCompletionist"
													name="typeFocus"
													className="w-0 h-0 invisible"
													onChange={(e) => setFocusType(e.target.value)}
													value="gameplayCompletionist"
													checked={focusType === "gameplayCompletionist"}
												/>
												<label
													htmlFor="gameplayCompletionist"
													className="cursor-pointer w-1/2 h-full rounded-md flex items-center justify-center hover:scale-105 hover:drop-shadow-3xl hover:outline hover:outline-1 hover:outline-app-secondary"
												>
													COMPLETIONIST
												</label>
											</div>
										</div>
									</div>
								</form>
							</div>
							<div id="resultsSection">
								<div className="text-3xl font-extrabold cursor-default mt-6">
									Based in your time (quit your job)
									<div className="bg-app-complementary w-1/2 h-2"></div>
								</div>
								<p>
									Based in your time, this would be the overview of how long it
									will take you to finish those sweet sweet games of yours...
								</p>
								<div className="w-full h-1/2 flex items-center justify-end text-xl font-bold text-center text-white">
									<div className="h-full w-2/4 bg-app-complementary flex items-center justify-center rounded-2xl drop-shadow-3xl">
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
