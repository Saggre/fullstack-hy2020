import React from 'react';
import Weather from './Weather';

const Country = ({country}) => {
    return (
        <>
            <h2>{country.name}</h2>
            <div>capital {country.capital}</div>
            <div>population {country.population}</div>
            <h3>Spoken languages</h3>
            <ul>{country.languages.map(language => {
                return (
                    <li key={language.iso639_2}>
                        {language.name}
                    </li>
                );
            })}</ul>
            <img src={country.flag} alt={country.name} className='flag'/>
            {'weather' in country &&
            <>
                <h3>Weather in {country.capital}</h3><br/>
                <Weather weather={country.weather}/>
            </>}
        </>
    );
};

export default Country;