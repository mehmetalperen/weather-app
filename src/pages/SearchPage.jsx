import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import "./SearchPage.css";
import PreviewCard from "../components/PreviewCard";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";

function SearchPage() {
  //Handle is adding
  const [isAdding, setIsAdding] = useState(false);
  //Handle is adding

  //Handle Search Results
  const [searchResults, setSearchResults] = useState({
    id: "",
    name: "",
    country: "",
  });

  const resetSearchResult = () => {
    setSearchResults({ id: "", name: "", country: "" });
  };

  //Handle user input
  const [userInput, setUserInput] = useState("");

  const handleTyping = (event) => {
    setUserInput(event.target.value);
  };
  //Handle user input

  useEffect(() => {
    if (userInput !== "") {
      fetchData();
    }
    if (userInput === "") {
      resetSearchResult();
    }
  }, [userInput]);

  //Handle fetch data from the API
  //api.openweathermap.org/data/2.5/weather?q=${city name, state code}&appid=c44bebe63065c02792900a2e3f561b37
  async function fetchData() {
    const data = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${userInput}&appid=c44bebe63065c02792900a2e3f561b37`
    );
    const itemsData = await data.json();
    if (itemsData.cod !== "404") {
      setSearchResults({
        id: itemsData.id,
        name: itemsData.name,
        country: itemsData.sys.country,
      });
    }
  }
  //Handle fetch data from the API

  //Handle Local storage saved places
  const [savedPlaces, setSavedPlaces] = useState([]);

  useEffect(() => {
    const savedPlacedString = localStorage.getItem("savedPlaces");
    if (savedPlacedString) {
      const savedPlacesIDs = JSON.parse(savedPlacedString);
      setSavedPlaces(savedPlacesIDs);
    } else {
      localStorage.setItem("savedPlaces", "[]");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("savedPlaces", JSON.stringify(savedPlaces));
  }, [savedPlaces]);

  const HandleSavePlace = (id) => {
    setSavedPlaces((previousPlaces) => {
      return [...previousPlaces, id];
    });
  };

  const HandleUnsavePlace = (id) => {
    setSavedPlaces((savedPlaces) => {
      return savedPlaces.filter((savedPlaceID) => savedPlaceID !== id);
    });
  };
  //Handle Local storage saved places

  return (
    <div className="SearchPage">
      <div className="search-btn-container">
        <Button
          variant="outline-dark"
          size="lg"
          onClick={() => {
            setIsAdding(!isAdding); //search bar will be toggled when clicked
          }}
        >
          Find Places
        </Button>
      </div>

      {isAdding ? ( //if true then search bar will pop up
        <div className="search-container">
          <InputGroup className="mb-3">
            <FormControl
              aria-describedby="basic-addon1"
              placeholder="Type name of the city you want to find"
              value={userInput}
              onChange={handleTyping}
            />
            <InputGroup.Prepend>
              <Button
                variant="outline-info"
                onClick={() => {
                  setUserInput("");
                  resetSearchResult();
                }}
              >
                Clear
              </Button>
              <Button
                variant="outline-dark"
                onClick={() => {
                  alert(
                    'after typing name of the city, put comma (,) and then type country code \n For example: \n country code for United States is "US"'
                  );
                }}
              >
                Can't find it?
              </Button>
            </InputGroup.Prepend>
          </InputGroup>
        </div>
      ) : null}

      {/* //itemsData.sys.country
    //itemsData.id
    //itemsData.name */}
      <div className="search-result">
        {searchResults.id !== "" ? (
          <PreviewCard
            key={searchResults.id}
            id={searchResults.id}
            name={searchResults.name}
            country={searchResults.country}
            isSaved={savedPlaces.includes(searchResults.id)}
            onSave={HandleSavePlace}
            onUnsave={HandleUnsavePlace}
          />
        ) : null}
      </div>
    </div>
  );
}

export default SearchPage;
