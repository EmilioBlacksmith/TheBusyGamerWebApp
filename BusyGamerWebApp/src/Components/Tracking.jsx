import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function Tracking({ newItemToTrack }) {
	const [isActive, setIsActive] = useState(true);
	const [trackingList, setTrackingList] = useState([]);
	const [longestGame, setLongestGame] = useState(0);
	const [shortestGame, setShortestGame] = useState(0);
	const [timeGameplayMain, setTimeGameplayMain] = useState(0);
	const [timeGameplayMainExtras, setTimeGameplayMainExtras] = useState(0);

	const toggleTrackingSection = () => {
		setIsActive(!isActive);
	};

	const addNewItemToList = (item) => {
		setTrackingList((prevList) => [...prevList, item]);
	};

	const containsItem = (item) => {
		let currentList = trackingList;
		if (currentList.includes(item)) {
			return true;
		} else {
			return false;
		}
	};

	const deleteEntry = (item) => {
		setTrackingList((prevList) => prevList.filter((x) => x !== item));
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
	}, [trackingList]);

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
						<div className=" w-full h-full p-4 flex flex-col gap-4 pl-8 pr-8">
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
							<div className="w-full h-80 overflow-auto">
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
							<div>
								<div className="w-full h-40 flex justify-between">
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
								<div className="text-3xl font-extrabold cursor-default">
									How Long Can You Play tho?
									<div className="bg-app-complementary w-1/2 h-2"></div>
								</div>
								<div>add form here</div>
							</div>
							<div className="text-3xl font-extrabold cursor-default">
								Based in your time (quit your job)
								<div className="bg-app-complementary w-1/2 h-2"></div>
							</div>
							<p>
								Based in your time, this would be the overview of how long it
								will take you to finish those sweet sweet games of yours...
							</p>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
