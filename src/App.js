import './App.css';
import React, { useState } from 'react'

// Api Key And Base
const api = {
  key: "",
  base: "https://api.openweathermap.org/data/2.5/",
  units: "metric",
  lang: "fi"
}


function App() {
  // UseStates
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  // Fetch From Api
  const search = () => {
    if (query === "") {
      alert("Kirjoita kaupungin nimi");
    }
    else {
      fetch(`${api.base}weather?q=${query}&lang=${api.lang}&units=${api.units}&appid=${api.key}`)
        .then(res => res.json())
        .then(result => {
          if (result.cod === "404"){
            alert("404 Kaupunkia ei löydy")
          }
          else {
          setWeather(result);
          setQuery('');
          //console.log(result)
          }
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

  const handleButton = () => {
    search();
  }

  const handleKey = (evt) => {
    if (evt.key === "Enter") {
      search();
    }
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
      <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 12) ? 'app warm' : 'app') : 'app'}>
        <main>
          <div className='content_box'>
            <h1>Sää nyt</h1>
            <div className="search_box">
              <input
                type="text"
                className="search_bar"
                placeholder="Kaupunki..."
                onChange={e => setQuery(e.target.value)}
                value={query}
                onKeyDown={handleKey}
              />
              <div className="btn">
                <button className="search_button" onClick={handleButton}>Hae</button>
              </div>
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
