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
    <div className="flex flex-col gap-8 p-4 w-4/5">
      <div>These are the latest games...</div>
      <div className="flex gap-8 flex-wrap">
        {data.map((item) => (
          <div key={item.id} className="w-64">
            <img
              src={item.imageUrl}
              alt={item.name}
              className="w-full h-3/4 rounded-md hover:scale-105"
            />
            <p>{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
