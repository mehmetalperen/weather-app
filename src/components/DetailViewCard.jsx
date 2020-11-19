import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import "./DetailViewCard.css";

function DetailViewCard(props) {
  const getDayString = (number) => {
    const dayStrings = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];
    return dayStrings[number - 1];
  };

  //Handle change unit
  const [units, setUnits] = useState("F");
  const handleChangeUnit = () => {
    units === "F" ? setUnits("C") : setUnits("F");
  };
  const [tempVal, setTempval] = useState(props.temp);
  const [feelTempVal, setFeelTempVal] = useState(props.feelTemp);

  useEffect(() => {
    if (units == "C") {
      setTempval(((props.temp - 32) * (5 / 9)).toFixed(2));
      setFeelTempVal(((props.feelTemp - 32) * (5 / 9)).toFixed(2));
    } else {
      setTempval(props.temp);
      setFeelTempVal(props.feelTemp);
    }
  }, [units]);
  //Handle change unit

  return (
    <div className="DetailViewCard">
      <div className="city-name">
        <h4 className="city-title">
          {props.city}, {props.country}
        </h4>
        <h4>{getDayString(props.day)}</h4>
      </div>

      <div className="weather-detail-container">
        <div className="deatil-data-container">
          <h3 className="temp-value">
            Temp: {tempVal}
            <i onClick={() => handleChangeUnit()}>{units}</i>
          </h3>
          <h5 className="feel-temp-val">Feels like: {feelTempVal}</h5>
          <h6 className="humity-val">Humity: {props.humidity}</h6>
        </div>

        <div className="weather-visual-detail-container">
          <img
            src={`http://openweathermap.org/img/wn/${props.img}@2x.png`}
            alt="icon"
          />
          <h6 className="img-description">{props.description}</h6>
        </div>
      </div>
    </div>
  );
}

export default DetailViewCard;
