import { useState } from "react";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import ContentSection from "./Components/ContentSection";

function App() {
	const [searchedData, setSearchedData] = useState("");

	const handleDataFromChild = (data) => {
		setSearchedData(data);
	};

	return (
		<div className="flex flex-col min-h-screen min-w-full items-center bg-app-main text-white font-sans">
			<Header valueSearched={handleDataFromChild} />
			<ContentSection searchedData={searchedData} />
			<Footer />
		</div>
	);
}

export default App;
