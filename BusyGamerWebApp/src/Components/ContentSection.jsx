import React, { useEffect, useState } from "react";
import Latest from "./Latest";
import Searched from "./Searched";

export default function ContentSection({ searchedData, newItemToAdd }) {
	const [currentSearch, setCurrentSearch] = useState("");

	useEffect(() => {
		setCurrentSearch(searchedData);
	}, [searchedData]);

	const handleNewTracking = (item) => {
		newItemToAdd(item);
	};

	return (
		<>
			{searchedData === "" ? (
				<Latest newItemToAdd={handleNewTracking} />
			) : (
				<Searched
					searchValue={currentSearch}
					newItemToAdd={handleNewTracking}
				/>
			)}
		</>
	);
}
