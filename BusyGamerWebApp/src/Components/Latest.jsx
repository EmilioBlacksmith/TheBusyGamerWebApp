import React, { useState, useEffect } from "react";
import axios from "axios";

const baseURL = "http://localhost:8080/topGames";

export default function Latest() {
  const [data, setData] = useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from the JSON file
        const response = await fetch(baseURL);
        const jsonData = await response.json();

        // Update the state with the fetched data
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex w-5/6 flex-col gap-8 p-4">
      <div className="text-3xl font-extrabold p-2">
        POPULAR RIGHT NOW
        <div className="bg-app-complementary w-1/3 h-2"></div>
      </div>
      <div className="flex flex-wrap justify-between gap-x-8 gap-y-16">
        {data.map((item) => (
          <div
            key={item.id}
            style={{ backgroundImage: `url(${item.imageUrl})` }}
            className="h-80 w-64 rounded-xl bg-cover bg-no-repeat bg-center hover:backdrop-blur-3xl drop-shadow-lg"
          >
            <div className="flex flex-col gap-2 justify-center items-center rounded-lg h-full w-full bg-black bg-opacity-75 opacity-0 backdrop-blur-md hover:opacity-100 drop-shadow-lg p-2 text-center transition-all ease-in-out duration-200 cursor-default">
              <div className="font-bold text-2xl">{item.name}</div>
              <div className="font-semibold text-sm">Main Story:</div>
              <div className="font-thin text-lg">{item.gameplayMain} Hours</div>
              <div className="font-semibold text-sm">Main + Extra:</div>
              <div className="font-thin text-lg">
                {item.gameplayMainExtra} Hours
              </div>
              <div className="font-semibold text-sm">Completionist:</div>
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
