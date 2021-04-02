import React, { useEffect, useState } from 'react';

function App() {

  const [search, setSearch] = useState('');
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    if(search) {
      fetch(`https://restcountries.eu/rest/v2/name/${search}`)
          .then(response => response.json())
          .then(data => setCountries(data))
    }
  }, [search]);

  return (
    <>
      <p>Find countries: <input value={search} onChange={(event) => setSearch(event.target.value)} /></p>
      { countries.length === 1 ? 
          <div>
            <h2>{countries[0].name}</h2>
            <p>Capital: {countries[0].capital}</p>
            <p>Population: {countries[0].population}</p>
            <h3>Languages</h3>
            <ul>
              {countries[0].languages.map(language => <li key={language.name}>{language.name}</li>)}
            </ul>
            <img src={`${countries[0].flag}`} alt={`${countries[0].name} FLAG`} />
          </div> :
          countries.length > 10 ? 
            <span>Too many matches, specify another filter</span> : 
            countries.map(country => <p key={country.name}>{country.name}</p>) }
    </>
  );
}

export default App;
