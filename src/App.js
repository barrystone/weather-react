import React, { useState } from "react";
const api = {
  key: "ec62a159cc09f89bd5d29a6a42ff0a0b",
  base: "https://api.openweathermap.org/data/2.5/"
};
function App() {
  var [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const fetching = () => {
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      // fetch(`${api.base}weather?q=${query}&appid=${api.key}`)
      .then(res => res.json())
      .then(result => {
        setWeather(result);
        setQuery("");
        console.log(result);
      });
  };
  const search = evt => {
    if (evt.key === "Enter") {
      fetching();
    }
  };
  window.onload = function() {
    query = "pIngtung";
    // query = "tung";
    fetching();
  };
  const dateBuilder = d => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "Aguest",
      "Setember",
      "Otober",
      "november",
      "December"
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wenesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    let hour = d.getHours();
    let minute = d.getMinutes();
    if (hour > 12) {
      hour -= 12;
      hour = "PM " + hour;
    } else {
      hour = "AM " + hour;
    }
    if (minute.toString().length === 1) {
      minute = "0" + minute;
    }
    // ${Object.keys(minute).length}${minute.toString().length}
    return ` ${hour}:${minute} ${day} ${date} ${month} ${year}`;
  };
  return (
    <div
      className={
        typeof weather.main != "undefined"
          ? weather.main.temp > 16
            ? "app bg2"
            : "app"
          : "app"
      }
    >
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {typeof weather.main != "undefined" ? (
          <div>
            <div className="location-box">
              <div className="location">
                {weather.name} {weather.sys.country}
              </div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">
                {Math.round(weather.main.temp * 10) / 10} ̊c
              </div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
          </div>
        ) : (
          <div className="notFind-box">
            <p>Not found the City</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
