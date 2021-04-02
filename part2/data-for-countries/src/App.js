import React, { useEffect, useState } from 'react';
import Countries from './Countries';

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
      <Countries countries={countries} setCountries={setCountries} />
    </>
  );
}

export default App;
