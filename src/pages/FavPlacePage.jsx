import React, { useState } from "react";
import "./FavPlacePage.css";
import PreviewCard from "../components/PreviewCard";
function FavPlacePage() {
  const [savedPlaces, setSavedPlaces] = useState([]);

  async function fetchItems() {
    const data = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?id=${savedPlaceIDs[savedPlaceCount]}&appid=c44bebe63065c02792900a2e3f561b37`
    );
    const itemData = await data.json();
    tempSavedPlaceDetailArr.push(itemData);

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

  //handle unsaving
  const handleUnsaving = (id) => {
    const updatedSavedPlacesIDs = savedPlaceIDs.filter((ID) => ID !== id);
    setSavedPlaces((allSavedPlaces) => {
      return allSavedPlaces.filter((place) => {
        return place.city.id !== id;
      });
    });
    localStorage.setItem("savedPlaces", JSON.stringify(updatedSavedPlacesIDs));
  };
  return (
    <div className="FavPlacePage">
      {savedPlaces.map((place) => {
        console.log(place);
        return (
          <PreviewCard
            key={place.city.id}
            id={place.city.id}
            name={place.city.name}
            country={place.city.country}
            isSaved={true}
            onUnsave={handleUnsaving}
            onSave={null}
          />
        );
      })}
    </div>
  );
}

export default FavPlacePage;
