import { useState } from "react";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import ContentSection from "./Components/ContentSection";
import Tracking from "./Components/Tracking";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

function App() {
  const [searchedData, setSearchedData] = useState<string>("");
  const [newItemToAdd, setNewItemToAdd] = useState<any[]>([]);
  const [gameListGlobal, setGameListGlobal] = useState<any[]>([]);

  const handleDataFromChild = (data: string) => {
    setSearchedData(data);
  };

  const handleNewTracking = (item: any) => {
    setNewItemToAdd(item);
  };

  const handleGameListUpdate = (gameList: any[]) => {
    setGameListGlobal(gameList);
  };

  return (
    <div className="flex min-h-screen min-w-full flex-col items-center bg-app-main font-sans text-white">
      <Header valueSearched={handleDataFromChild} />
      <ContentSection
        searchedData={searchedData}
        newItemToAdd={handleNewTracking}
        globalGameList={gameListGlobal}
      />
      <Tracking
        newItemToTrack={newItemToAdd}
        listOfGames={handleGameListUpdate}
      />
      <Footer />
      <ToastContainer autoClose={1500} position="bottom-right" theme="dark" />
    </div>
  );
}

export default App;
