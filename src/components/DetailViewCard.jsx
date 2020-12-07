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
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    if (number >= 7) {
      while (number > 7) {
        number -= 7;
      }
      return dayStrings[number];
    } else {
      return dayStrings[number];
    }
  };

  //Handle change unit
  const [units, setUnits] = useState("F");
  const handleChangeUnit = () => {
    units === "F" ? setUnits("C") : setUnits("F");
  };
  const [tempVal, setTempval] = useState(Math.round(props.temp));
  const [feelTempVal, setFeelTempVal] = useState(Math.round(props.feelTemp));

  const convertToCel = (fahrenheit) => {
    return Math.round((fahrenheit - 32) * (5 / 9));
  };

  useEffect(() => {
    if (units == "C") {
      setTempval(convertToCel(props.temp));
      setFeelTempVal(convertToCel(props.feelTemp));
    } else {
      setTempval(Math.round(props.temp));
      setFeelTempVal(Math.round(props.feelTemp));
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
            ) : (
              <h1></h1>
            )}
            <div className="day-close-btn-box">
              <h4 style={{ marginRight: "5px" }}>{getDayString(props.day)}</h4>
              {!props.isMainCard ? (
                <Button
                  variant="outline-danger"
                  onClick={() => {
                    if (!props.isMainCard) {
                      setShowFullDetail(false);
                    }
                  }}
                >
                  close
                </Button>
              ) : null}
            </div>
          </div>

          <div className="weather-detail-container">
            <div className="deatil-data-container">
              <h3 className="temp-value">
                Temp: {tempVal}
                <Button
                  variant="outline-info"
                  onClick={() => handleChangeUnit()}
                >
                  {units}
                </Button>
              </h3>
              <h5 className="feel-temp-val">Feels like: {feelTempVal}</h5>
              <h6 className="humity-val">Humity: {props.humidity}</h6>
            </div>

            <div className="weather-visual-detail-container">
              <img
                src={`https://openweathermap.org/img/wn/${props.img}@2x.png`}
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
            src={`https://openweathermap.org/img/wn/${props.img}@2x.png`}
            alt="icon"
          />
        </div>
      )}
    </div>
  );
}

export default DetailViewCard;
