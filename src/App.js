import './App.css';
import React, { useState } from 'react'

// Api Key And Base
const api = {
  key: "052e03b09d72e1f565223318e363281a",
  base: "https://api.openweathermap.org/data/2.5/",
  units: "metric",
  lang: "fi"
}


function App() {
  // UseStates
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  // Fetch From Api
  const search = (evt) => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&lang=${api.lang}&units=${api.units}&appid=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          // console.log(result)
        });
    }
  }

  // Get Weather Icon
  const icon = () => {
    let get_icon = weather.weather[0].icon;
    let icon_url = "https://openweathermap.org/img/wn/";
    let format = ".png";

  return `${icon_url}${get_icon}${format}`;

}
  // Get Current Date
  const dates = (d) => {
    // Date lists
    let months = ["Tammikuu", "Helmikuu", "Maaliskuu", "Huhtikuu", "Toukokuu", "Kesäkuu", "Heinäkuu", "Elokuu", "Syyskuu", "Lokakuu", "Marraskuu", "Joulukuu"];
    let days = ["Sunnuntai", "Maanantai", "Tiistai", "Keskiviikko", "Torstai", "Perjantai", "Lauantai"];

    // Get Date Variables
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    // Return Variables
    return `${day} ${date} ${month} ${year}`;
  }

  return (
    <div className="app">
      <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'app warm' : 'app') : 'app'}>
        <main>
          <div className='content_box'>
            <h1>Sää nyt</h1>
            <div className="search_box">
              <input
                type="text"
                className="search_bar"
                placeholder="Hae"
                onChange={e => setQuery(e.target.value)}
                value={query}
                onKeyDown={search}
              />
            </div>
            {(typeof weather.main != "undefined") ? (
              <div>
                <div className="location-box">
                  <div className="location">{weather.name}, {weather.sys.country}</div>
                  <div className="date">
                    {dates(new Date())}
                  </div>
                </div>

                <div className="weather-box">
                  <div className="temp-cont">
                    <div className="icon">
                      <img src={icon()} className="icon_img" alt="Weather Icon"></img>
                    </div>
                    <div className="temp">
                      {Math.round(weather.main.temp)}°c
                    </div>
                  </div>
                  <div className="info-cont">
                    <div className="desc">
                      {weather.weather[0].description}
                    </div>
                    <div className="feels">
                      Tuntuu kuin: {Math.round(weather.main.feels_like)}°c
                    </div>
                  </div>
                  <hr />
                  <div className="humidity">
                    Kosteus: {weather.main.humidity}%
                  </div>
                 
                  <div className="wind">
                    Tuulen nopeus: {weather.wind.speed} m/s
                  </div>
                  <hr />
                </div>
              </div>
            ) : ('')}
          </div>
        </main>
      </div>
    </div>
  );
}


export default App;
