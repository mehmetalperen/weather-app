import React, { useEffect, useState } from "react";
import "./WeatherDetailPage.css";
import DetailViewCard from "../components/DetailViewCard";

function WeatherDetailPage({ match }) {
  const [showCurrentDayData, setShowCurrentDayData] = useState(false);
  const [currentDayData, setCurrentDayData] = useState({
    city: "",
    country: "",
    temp: "",
    feelTemp: "",
    humidity: "",
    weather: [],
    day: "",
  });

  const [showWeekData, setShowWeekData] = useState(false);
  const [weekData, setWeekData] = useState([]);
  useEffect(() => {
    fetchCurrentDayData();
    fetchWeekData();
  }, []);

  async function fetchCurrentDayData() {
    const dayData = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?id=${match.params.id}&units=imperial&appid=c44bebe63065c02792900a2e3f561b37`
    );
    const dayItem = await dayData.json();
    setCurrentDayData({
      id: match.params.id,
      city: dayItem.name,
      country: dayItem.sys.country,
      temp: dayItem.main.temp,
      feelTemp: dayItem.main.feels_like,
      humidity: dayItem.main.humidity,
      weather: dayItem.weather,
      day: new Date().getDay(),
    });

    setShowCurrentDayData(true);
  }

  async function fetchWeekData() {
    const weekData = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?id=${match.params.id}&units=imperial&appid=c44bebe63065c02792900a2e3f561b37`
    );
    const weekItem = await weekData.json();
    setWeekData(weekItem.list);
    setShowWeekData(true);
  }
  return (
    <div className="WeatherDetailPage">
      <div
        style={{
          width: "100%",
          margin: "20px auto 10px",
          justifyContent: "center",
          display: "flex",
        }}
      >
        {showCurrentDayData ? (
          <DetailViewCard
            id={currentDayData.id}
            key={currentDayData.id}
            isMainCard={true}
            temp={currentDayData.temp}
            feelTemp={currentDayData.feelTemp}
            city={currentDayData.city}
            country={currentDayData.country}
            day={currentDayData.day}
            humidity={currentDayData.humidity}
            img={currentDayData.weather[0].icon}
            description={currentDayData.weather[0].description.toUpperCase()}
          />
        ) : null}
      </div>

      {showWeekData
        ? weekData.map((dayData, index) => {
            if (new Date(dayData.dt_txt).getHours() === 15) {
              return (
                <DetailViewCard
                  id={index}
                  key={index}
                  isMainCard={false}
                  temp={dayData.main.temp}
                  feelTemp={dayData.main.feels_like}
                  city={currentDayData.city}
                  country={currentDayData.country}
                  day={new Date(dayData.dt_txt).getDay()}
                  humidity={dayData.main.humidity}
                  img={dayData.weather[0].icon}
                  description={dayData.weather[0].description.toUpperCase()}
                />
              );
            }
          })
        : null}
    </div>
  );
}

export default WeatherDetailPage;
