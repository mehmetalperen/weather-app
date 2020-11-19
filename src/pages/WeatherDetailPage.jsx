import React, { useEffect, useState } from "react";
import "./WeatherDetailPage.css";
import DetailViewCard from "../components/DetailViewCard";
function WeatherDetailPage({ match }) {
  //First fetch
  //http://api.openweathermap.org/data/2.5/weather?id=${match.params.id}&appid=c44bebe63065c02792900a2e3f561b37
  //then get lat, lon, and dt values
  const [itemBacisDetail, setItemBacisDetail] = useState({
    lat: "",
    lon: "",
    dt: "",
    name: "",
    country: "",
  });

  const [currentDayData, setCurrentDayData] = useState({
    feelsLike: "",
    humidity: "",
    weather: [],
    temp: "",
  });
  const [showCurrentDayData, setShowCurrentDayData] = useState(false);

  const [weekDataDetail, setWeekDataDetail] = useState([]);

  useEffect(() => {
    fetchItem();
  }, []);

  async function fetchItem() {
    const data = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?id=${match.params.id}&appid=c44bebe63065c02792900a2e3f561b37`
    );
    const item = await data.json();
    setItemBacisDetail({
      lat: item.coord.lat,
      lon: item.coord.lon,
      dt: item.dt,
      name: item.name,
      country: item.sys.country,
    });
  }

  useEffect(() => {
    if (itemBacisDetail.dt !== "") {
      getWeeklyData();
    }
  }, [itemBacisDetail]);

  //link to fetch in order to get 5 days weather report
  //https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=51.51&lon=-0.13&dt=1605735196&appid=c44bebe63065c02792900a2e3f561b37

  async function getWeeklyData() {
    const weekData = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${itemBacisDetail.lat}&lon=${itemBacisDetail.lon}&dt=${itemBacisDetail.dt}&appid=c44bebe63065c02792900a2e3f561b37&units=imperial`
    );
    const itemWeek = await weekData.json();

    setCurrentDayData({
      feelsLike: itemWeek.current.feels_like,
      humidity: itemWeek.current.humidity,
      weather: itemWeek.current.weather,
      temp: itemWeek.current.temp,
      day: new Date().getDay(),
    });
    setWeekDataDetail(itemWeek.hourly);
    setShowCurrentDayData(true);
  }

  return (
    <div className="WeatherDetailPage">
      {showCurrentDayData ? (
        <DetailViewCard
          key={-1}
          id={-1}
          city={itemBacisDetail.name}
          country={itemBacisDetail.country}
          temp={currentDayData.temp}
          feelTemp={currentDayData.feelsLike}
          humidity={currentDayData.humidity}
          img={currentDayData.weather[0].icon}
          description={currentDayData.weather[0].description}
          day={currentDayData.day}
        />
      ) : null}
    </div>
  );
}

export default WeatherDetailPage;
