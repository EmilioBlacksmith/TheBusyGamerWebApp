import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function Tracking({ newItemToTrack }) {
	const [isActive, setIsActive] = useState(true);
	const [trackingList, setTrackingList] = useState([]);

	const toggleTrackingSection = () => {
		setIsActive(!isActive);
	};

	const addNewItemToList = (item) => {
		let currentList = trackingList;
		currentList.push(item);
		setTrackingList(currentList);
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
		let currentList = trackingList;
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
						<div className=" w-full h-full p-4 flex flex-col gap-4">
							<div className="text-3xl font-extrabold cursor-default">
								THIS WILL TAKE A WHILE...
								<div className="bg-app-complementary w-4/6 h-2"></div>
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
							<div className="flex flex-col gap-4">
								{trackingList.length !== 0 ? trackingList.map((item) => (
									<div
										className="w-full h-10 flex flex-row cursor-default bg-app-secondary-dark rounded-lg drop-shadow-sm"
										key={item.id}
									>
										<div className="h-full w-2/6 flex items-center pl-2 font-bold">
											<p className="truncate">{item.name}</p>
										</div>
										<div className="flex flex-row h-full w-4/6 justify-center gap-6 text-center text-app-grey font-semibold text-lg truncate">
											<div className="flex w-40 items-center justify-center">
												{item.gameplayMain} Hours
											</div>
											<div className="flex w-40 items-center justify-center">
												{item.gameplayMainExtra} Hours
											</div>
											<div className="flex w-40 items-center justify-center">
												{item.gameplayCompletionist} Hours
											</div>
										</div>
										<div className="fixed right-0 top-0 rounded-lg w-10 h-full bg-red pl-2.5 text-2xl drop-shadow-3xl flex items-center cursor-pointer">
											
										</div>
									</div>
								)) : 
								(
									<div>Nothing to see here...</div>
								)}
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
