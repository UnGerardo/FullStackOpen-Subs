import React from 'react';

const Countries = ({ countries, setCountries }) => {

    const showCountryInfo = (name) => {
        const countryIndex = countries.findIndex(country => country.name === name);

        const countriesCopy = [...countries];
        countriesCopy[countryIndex]['show'] = true;
        setCountries(countriesCopy);
    }
    
    //if match not found 404 is returned with message and countries var is an object with 'message'
    if(countries.message) {
        return <span>Match not found</span>;
    }

    // if only one country found
    if(countries.length === 1) {
        return (
            <div>
                <h2>{countries[0].name}</h2>
                <p>Capital: {countries[0].capital}</p>
                <p>Population: {countries[0].population}</p>
                <h3>Languages</h3>
                <ul>
                {countries[0].languages.map(language => <li key={language.name}>{language.name}</li>)}
                </ul>
                <img src={`${countries[0].flag}`} alt={`${countries[0].name} FLAG`} />
            </div>
        );
    } else if (countries.length <= 10) {
        return (
            <>
                {countries.map(country => {
                        if(country['show']) {
                            return (
                                <div key={country.name}>
                                    <h2>{country.name}</h2>
                                    <p>Capital: {country.capital}</p>
                                    <p>Population: {country.population}</p>
                                    <h3>Languages</h3>
                                    <ul>
                                    {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
                                    </ul>
                                    <img src={`${country.flag}`} alt={`${country.name} FLAG`} />
                                </div>
                            );
                        }
                        return <p key={country.name} >{country.name} <button onClick={() => showCountryInfo(country.name)}>Show</button> </p>
                    }
                )}
            </>
        );
    } else { // if more than 10 countries found
        return (
            <span>Too many matches, specify another filter</span>
        );
    }
}

export default Countries;