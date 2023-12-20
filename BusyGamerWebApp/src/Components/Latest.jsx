import React, { useState, useEffect } from "react";

const baseURL = "http://localhost:8080/topGames";

export default function Latest() {
	const [data, setData] = useState([]);

	React.useEffect(() => {
		const fetchData = async () => {
			try {
				// Fetch data from the JSON file
				const response = await fetch(baseURL);
				const jsonData = await response.json();

				//delete last entry // update information entry
				jsonData.pop();

				// Update the state with the fetched data
				setData(jsonData);
			} catch (error) {
				console.error("Error fetching data:", error.message);
			}
		};

		fetchData();
	}, []);

	return (
		<div className="flex w-5/6 flex-col gap-8 p-4 mb-6 mt-6">
			<div className="text-3xl font-extrabold p-2">
				POPULAR RIGHT NOW
				<div className="bg-app-complementary w-1/3 h-2"></div>
			</div>
			<div className="flex flex-wrap justify-between gap-x-8 gap-y-16 mt-4">
				{data.map((item) => (
					<div
						key={item.id}
						className="h-80 w-64 rounded-xl hover:backdrop-blur-3xl drop-shadow-3xl -mt-2 align-bottom mb-4"
						onClick={() => {
							console.log("add:", item.id);
						}}
					>
						<img
							src={item.imageUrl}
							alt={item.name}
							className="h-full w-full rounded-xl fixed object-cover"
						/>
						<div className="flex flex-col gap-2 justify-center items-center rounded-lg h-full w-full bg-black bg-opacity-75 opacity-0 backdrop-blur-md hover:opacity-100 outline outline-app-complementary outline-1 drop-shadow-3xl p-2 text-center transition-all ease-in-out duration-200 cursor-pointer">
							<div className="bg-app-complementary w-10 h-10 -mt-4 absolute flex justify-center items-center text-xl font-black rounded-full top-0">
								+
							</div>
							<div className="font-bold text-2xl">{item.name}</div>
							<div className="font-semibold text-sm -mb-3">Main Story:</div>
							<div className="font-thin text-lg">{item.gameplayMain} Hours</div>
							<div className="font-semibold text-sm -mb-3">Main + Extra:</div>
							<div className="font-thin text-lg">
								{item.gameplayMainExtra} Hours
							</div>
							<div className="font-semibold text-sm -mb-3">Completionist:</div>
							<div className="font-thin text-lg">
								{item.gameplayCompletionist} Hours
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
