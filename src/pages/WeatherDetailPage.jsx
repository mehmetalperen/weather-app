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
    //current day's data
    feelsLike: "",
    humidity: "",
    weather: [],
    temp: "",
  });
  const [showCurrentDayData, setShowCurrentDayData] = useState(false); //show current day's data

  const [weekDataDetail, setWeekDataDetail] = useState([]); //week's data
  const [showWeekDataDetail, setShowWeekDataDetail] = useState(false); //show week's data

  useEffect(() => {
    fetchItem();
  }, []);

  async function fetchItem() {
    const data = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?id=${match.params.id}&appid=c44bebe63065c02792900a2e3f561b37`
    );
    const item = await data.json();
    setItemBacisDetail({
      //getting variables that we need for getting detailed data
      lat: item.coord.lat,
      lon: item.coord.lon,
      dt: item.dt,
      name: item.name,
      country: item.sys.country,
    });
  }

  useEffect(() => {
    if (itemBacisDetail.dt !== "") {
      //if there is no ERROR
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
      //day's data obj
      feelsLike: itemWeek.current.feels_like,
      humidity: itemWeek.current.humidity,
      weather: itemWeek.current.weather,
      temp: itemWeek.current.temp,
      day: new Date().getDay(),
    });
    setWeekDataDetail(itemWeek.hourly); //week's data array
    setShowCurrentDayData(true); //show current data of the current day
    setShowWeekDataDetail(true); //show current data of the week
  }

  return (
    <div className="WeatherDetailPage">
      {showCurrentDayData ? (
        <DetailViewCard
          key={0}
          id={0}
          isMainCard={true}
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

      {showWeekDataDetail
        ? weekDataDetail.map((dayDetail, index) => {
            return (
              <DetailViewCard
                key={index + 1}
                id={index + 1}
                isMainCard={false}
                city={"no city name"} //display city and country names in only main card
                country={"no contry name"}
                temp={dayDetail.temp}
                feelTemp={dayDetail.feels_like}
                humidity={dayDetail.humidity}
                img={dayDetail.weather[0].icon}
                description={dayDetail.weather[0].description}
                day={currentDayData.day + index + 1}
              />
            );
          })
        : null}
    </div>
  );
}

export default WeatherDetailPage;
