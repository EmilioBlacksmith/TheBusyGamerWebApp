import React, { useEffect, useState } from "react";
import Latest from "./Latest";
import Searched from "./Searched";

export default function ContentSection({ searchedData }) {
	const [currentSearch, setCurrentSearch] = useState("");

	useEffect(() => {
		setCurrentSearch(searchedData);
	}, [searchedData]);

	return (
		<>
			{searchedData === "" ? (
				<Latest />
			) : (
				<Searched searchValue={currentSearch} />
			)}
		</>
	);
}
