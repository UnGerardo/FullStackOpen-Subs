import React, { useEffect, useState } from 'react';
import Countries from './Countries';

function App() {

  const weatherAPIKEY = process.env.REACT_APP_API_KEY;
  const [search, setSearch] = useState('');
  const [countries, setCountries] = useState([]);
  const [temp, setTemp] = useState(0);
  const [windSpeed, setWindSpeed] = useState(0);
  const [windDirection, setWindDirection] = useState(0);
  const [weatherImgUrl, setWeatherImgUrl] = useState('');

  useEffect(() => {
    if(search) {
      fetch(`https://restcountries.eu/rest/v2/name/${search}`)
          .then(response => response.json())
          .then(data => {
            setCountries(data);
            if(data.length === 1) {
              fetch(`http://api.openweathermap.org/data/2.5/weather?q=${data[0].capital}&appid=${weatherAPIKEY}&units=metric`)
              .then(response => response.json())
              .then(data => {
                setTemp(data.main.temp);
                setWindSpeed(data.wind.speed);
                setWindDirection(data.wind.deg);
                setWeatherImgUrl(data.weather[0].icon);
                console.log(data)
              })
            }
          })
    }
  }, [search]);

  return (
    <>
      <p>Find countries: <input value={search} onChange={(event) => setSearch(event.target.value)} /></p>
      <Countries countries={countries} setCountries={setCountries} temp={temp} windSpeed={windSpeed} windDirection={windDirection} weatherImgUrl={weatherImgUrl} />
    </>
  );
}

export default App;
