import React, { useState } from "react";

const searchURL = "http://localhost:8080/search?q=";

export default function Searched({ searchValue }) {
	const [data, setData] = useState([]);
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	React.useEffect(() => {
		if (searchValue === "") {
			return;
		}

		setIsLoading(true);
		setError(null);

		const fetchData = async () => {
			try {
				const valueSearched = encodeURIComponent(searchValue);
				let search = searchURL + valueSearched;
				const response = await fetch(search);
				if (!response.ok) {
					// Handle non-successful response (e.g., 404)
					throw new Error("Network response was not ok");
				}
				const jsonData = await response.json();

				if (jsonData.error && jsonData.error === "Search query not found") {
					setError("Couldn't find anything with that search query");
					setData([]);
				} else {
					setError(null);
					setData(jsonData);
				}
			} catch (error) {
				console.error("Error fetching data:", error.message);
				setError("An error occurred while fetching data");
			} finally {
				setIsLoading(false);
			}
		};

		fetchData();
	}, [searchValue]);

	return (
		<div className="flex w-5/6 flex-col gap-8 p-4 mb-6 mt-6">
			<div className="text-3xl font-extrabold p-2">
				SEARCHED: {searchValue.toUpperCase()}
				<div className="bg-app-complementary w-1/3 h-2"></div>
			</div>
			{isLoading ? (
				<div className="text-app-complementary">Searching...</div>
			) : error ? (
				<div className="text-red">{error}</div>
			) : (
				<div className="flex flex-wrap justify-between gap-x-8 gap-y-16 mt-4">
					{data.map((item) => (
						<div
							key={item.id}
							style={{
								backgroundImage: item.imageUrl
									? `url(${item.imageUrl})`
									: "none",
								backgroundColor: item.imageUrl ? "#171717" : "transparent",
							}}
							className="h-80 w-64 rounded-xl bg-cover bg-no-repeat bg-center hover:backdrop-blur-3xl drop-shadow-3xl -mt-4 align-bottom mb-4"
							onClick={() => {
								console.log("add:", item.name);
							}}
						>
							<div className="flex flex-col gap-2 justify-center items-center rounded-lg h-full w-full bg-black bg-opacity-75 opacity-0 backdrop-blur-md hover:opacity-100 outline outline-app-complementary outline-1 drop-shadow-3xl p-2 text-center transition-all ease-in-out duration-200 cursor-pointer">
								<div className="bg-app-complementary w-10 h-10 -mt-4 absolute flex justify-center items-center text-xl font-black rounded-full top-0">
									+
								</div>
								<div className="font-bold text-2xl">{item.name}</div>
								<div className="font-semibold text-sm -mb-3">Main Story:</div>
								<div className="font-thin text-lg">
									{item.gameplayMain} Hours
								</div>
								<div className="font-semibold text-sm -mb-3">Main + Extra:</div>
								<div className="font-thin text-lg">
									{item.gameplayMainExtra} Hours
								</div>
								<div className="font-semibold text-sm -mb-3">
									Completionist:
								</div>
								<div className="font-thin text-lg">
									{item.gameplayCompletionist} Hours
								</div>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
}