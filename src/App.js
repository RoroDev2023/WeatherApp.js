import React, { useState, useEffect } from 'react';
import { Search, GeoAltFill } from 'react-bootstrap-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTornado, faCloudRain, faWind } from '@fortawesome/free-solid-svg-icons';
import cloudIcon from "../src/images/clouds.png";
import sunIcon from "../src/images/clear.png";
import rainIcon from '../src/images/rain.png';
import mistIcon from '../src/images/mist.png';
import snowIcon from '../src/images/snow.png';
import hazeIcon from '../src/images/drizzle.png';
import cloudImg from '../src/images/clouds.jpeg';
import clearImg from '../src/images/clear.jpeg';
import snowImg from '../src/images/snow.jpg';
import rainImg from '../src/images/rain.jpeg';
import mistImg from '../src/images/mist.jpeg';

const api = {
  key: "92f4379c7945d4bbec80dd383f0db10b",
  base: "https://api.openweathermap.org/data/2.5/weather?units=metric&q="
};

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  const [backgroundImage, setBackgroundImage] = useState('');

  const search = () => {
    fetch(`${api.base}${query}&appid=${api.key}`)
      .then(res => res.json())
      .then(result => {
        setWeather(result);
        setQuery('');
        console.log(result);
      });
  };

  const getWeatherIcon = (weatherCondition) => {
    switch (weatherCondition) {
      case 'Clouds':
        return <img className="weather_icon" src={cloudIcon} alt="Clouds" />;
      case 'Clear':
        return <img className="weather_icon" src={sunIcon} alt="Clear" />;
      case 'Rain':
        return <img className="weather_icon" src={rainIcon} alt="Rain" />;
      case 'Mist':
        return <img className="weather_icon" src={mistIcon} alt="Rain" />;
      case 'Snow':
        return <img className="weather_icon" src={snowIcon} alt="Rain" />;
      case 'Haze':
          return <img className="weather_icon" src={hazeIcon} alt="Rain" />;
      default:
        return null;
    }
  };

  const setBackground = (weatherCondition) => {
    if (weatherCondition === 'Clear') {
      setBackgroundImage(`url(${clearImg})`);
    } else if (weatherCondition === 'Clouds') {
      setBackgroundImage(`url(${cloudImg})`);
    } else if (weatherCondition === 'Rain') {
      setBackgroundImage(`url(${rainImg})`);
    } else if (weatherCondition === 'Mist') {
      setBackgroundImage(`url(${mistImg})`);
    } else if (weatherCondition === 'Snow') {
      setBackgroundImage(`url(${snowImg})`);
    } else {
      setBackgroundImage(`url(${clearImg})`)
    }
    
  };

  useEffect(() => {
    if (weather.weather && weather.weather[0] && weather.weather[0].main) {
      setBackground(weather.weather[0].main);
    }
  }, [weather]);

  const fulldate = () => {
    const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const d = new Date();
    let weekday = weekdays[d.getDay()];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let day = d.getDate();
    let year = d.getFullYear();
    let month = months[d.getMonth()];

    return `${weekday} ${day} ${month} ${year}`;
  };

  return (
    <div className="App">
      <main className="frame">
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={(evt) => {
              if (evt.key === "Enter") {
                search();
              }
            }}
          />
          <button className="search-btn" onClick={search}>
            <Search className="search-icon" />
          </button>
        </div>
        {typeof weather.main !== "undefined" ? (
          <div className="info" style={{ backgroundImage: backgroundImage }}>
            <div className="location">
              <GeoAltFill />
              <div id="city">{weather.name}</div>
              <div id="country">{weather.sys.country}</div>
            </div>
            <div className="full_date">{fulldate()}</div>
            <div className="fullweather_info">
              {getWeatherIcon(weather.weather[0].main)}
              <div id="weather_unit">{Math.round(weather.main.temp)}°C</div>
              <div id="weather_disc">{weather.weather[0].main}</div>
              <div id="weather_border" />
            </div>
            <div className="details">
              <div className="left">
                <div className="weather_title">Humidity</div>
                <FontAwesomeIcon className="weather_ic" icon={faCloudRain} />
                <div className="weather_info">{weather.main.humidity} %</div>
              </div>
              <div id="center_bar" />
              <div className="middle">
                <div className="weather_title">Wind Speed</div>
                <FontAwesomeIcon className="weather_ic" icon={faWind} />
                <div className="weather_info">{weather.wind.speed} km/h</div>
              </div>
              <div id="center_bar" />
              <div className="right">
                <div className="weather_title">Air Pressure</div>
                <FontAwesomeIcon id="tornado" className="weather_ic" icon={faTornado} />
                <div className="weather_info">{weather.main.pressure} hPa</div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </main>
    </div>
  );
}

export default App;

