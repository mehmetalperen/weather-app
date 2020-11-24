import React, { useState } from "react";
import "./FavPlacePage.css";
function FavPlacePage() {
  const [savedPlaces, setSavedPlaces] = useState([]);

  async function fetchItems() {
    console.log(savedPlaceIDs[savedPlaceCount]);
    const data = await fetch(
      `http://api.openweathermap.org/data/2.5/forecast?id=2950159&appid=c44bebe63065c02792900a2e3f561b37`
    );
    const itemData = await data.json();
    // console.log(itemData);
    // tempSavedPlaceDetailArr.push(itemData);

    if (
      tempSavedPlaceDetailArr.length === savedPlaceIDs.length &&
      savedPlaces.length === 0
    ) {
      setSavedPlaces(tempSavedPlaceDetailArr);
    }
  }

  //Get saved places IDs
  const savedPlaceIDs = JSON.parse(localStorage.getItem("savedPlaces"));

  //Getting saved places details
  let tempSavedPlaceDetailArr = [];
  let savedPlaceCount = savedPlaceIDs.length - 1;
  while (savedPlaceCount >= 0) {
    fetchItems();
    savedPlaceCount--;
  }
  return (
    <div className="FavPlacePage">
      <h1>FavPlacePage</h1>
    </div>
  );
}

export default FavPlacePage;
