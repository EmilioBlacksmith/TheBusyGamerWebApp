import React, { useEffect, useState } from "react";
import Latest from "./Latest";
import Searched from "./Searched";

export default function ContentSection({
  searchedData,
  newItemToAdd,
  globalGameList,
}: {
  searchedData: string;
  newItemToAdd: (item: any) => void;
  globalGameList: any[];
}) {
  const [currentSearch, setCurrentSearch] = useState<string>("");
  const [currentGlobalGameList, setGlobalGameList] = useState<any[]>([]);

  useEffect(() => {
    setCurrentSearch(searchedData);
  }, [searchedData]);

  useEffect(() => {
    setGlobalGameList(globalGameList);
  }, [globalGameList]);

  const handleNewTracking = (item) => {
    newItemToAdd(item);
  };

  return (
    <>
      {searchedData === "" ? (
        <Latest
          newItemToAdd={handleNewTracking}
          globalGameList={currentGlobalGameList}
        />
      ) : (
        <Searched
          searchValue={currentSearch}
          newItemToAdd={handleNewTracking}
          globalGameList={currentGlobalGameList}
        />
      )}
    </>
  );
}
