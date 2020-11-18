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

  //Handle user input
  const [userInput, setUserInput] = useState("");
  const handleTyping = (event) => {
    setUserInput(event.target.value);
    console.log(userInput);
  };

  useEffect(() => {
    fetchData();
  }, [userInput]);
  //Handle user input

  //Handle fetch data from the API
  //api.openweathermap.org/data/2.5/weather?q=${city name, state code}&appid=c44bebe63065c02792900a2e3f561b37
  async function fetchData() {
    const data = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${userInput}&appid=c44bebe63065c02792900a2e3f561b37`
    );
    const itemsData = await data.json();
    console.log(itemsData);
    console.log("tyring to fetch" + userInput);
  }

  //Handle fetch data from the API

  return (
    <div className="SearchPage">
      <div className="search-btn-container">
        <Button
          variant="outline-dark"
          size="lg"
          onClick={() => {
            setIsAdding(!isAdding);
          }}
        >
          Find Places
        </Button>
      </div>

      {isAdding ? (
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
                }}
              >
                Clear
              </Button>
            </InputGroup.Prepend>
          </InputGroup>
        </div>
      ) : null}

      <div className="search-result">
        <PreviewCard />
        <PreviewCard />
        <PreviewCard />
        <PreviewCard />
        <PreviewCard />
        <PreviewCard />
      </div>
    </div>
  );
}

export default SearchPage;
