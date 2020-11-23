import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import "./DetailViewCard.css";

function DetailViewCard(props) {
  const [showFullDetail, setShowFullDetail] = useState(false);
  useEffect(() => {
    if (props.isMainCard) {
      setShowFullDetail(true);
    }
  }, []);

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

    if (number >= 7) {
      while (number > 7) {
        number -= 7;
      }
      return dayStrings[number - 1];
    } else {
      return dayStrings[number - 1];
    }
  };

  //Handle change unit
  const [units, setUnits] = useState("F");
  const handleChangeUnit = () => {
    units === "F" ? setUnits("C") : setUnits("F");
  };
  const [tempVal, setTempval] = useState(props.temp);
  const [feelTempVal, setFeelTempVal] = useState(props.feelTemp);

  const convertToCel = (fahrenheit) => {
    return ((fahrenheit - 32) * (5 / 9)).toFixed(2);
  };

  useEffect(() => {
    if (units == "C") {
      setTempval(convertToCel(props.temp));
      setFeelTempVal(convertToCel(props.feelTemp));
    } else {
      setTempval(props.temp);
      setFeelTempVal(props.feelTemp);
    }
  }, [units]);
  //Handle change unit

  return (
    <div className="DetailViewCard-wrapper">
      {showFullDetail ? (
        <div className="DetailViewCard">
          <div className="city-name">
            {props.isMainCard ? (
              <h4 className="city-title">
                {props.city}, {props.country}
              </h4>
            ) : null}
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
      ) : (
        <div
          className="little-previewCard-container"
          onClick={() => {
            setShowFullDetail(true);
          }}
        >
          <h1 className="day">{getDayString(props.day)}</h1>
          <img
            src={`http://openweathermap.org/img/wn/${props.img}@2x.png`}
            alt="icon"
          />
        </div>
      )}
    </div>
  );
}

export default DetailViewCard;
