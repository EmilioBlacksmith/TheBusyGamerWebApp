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
            style={{ backgroundImage: `url(${item.imageUrl})` }}
            className="h-80 w-64 rounded-xl bg-cover bg-no-repeat bg-center hover:backdrop-blur-3xl drop-shadow-3xl -mt-4 align-bottom mb-4"
          >
            <div className="flex flex-col gap-2 justify-center items-center rounded-lg h-full w-full bg-black bg-opacity-75 opacity-0 backdrop-blur-md hover:opacity-100 outline outline-app-complementary outline-1 drop-shadow-3xl p-2 text-center transition-all ease-in-out duration-200 cursor-pointer">
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
            <div
              className="bg-app-complementary w-10 h-10 fixed flex justify-center items-center text-3xl font-black rounded-full -mt-8 outline outline-2 outline-white drop-shadow-3xl cursor-pointer self-end right-0 hover:scale-110 transition-all hover:drop-shadow-3xl"
              onClick={() => {
                console.log("add:", item.name);
              }}
            >
              +
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
