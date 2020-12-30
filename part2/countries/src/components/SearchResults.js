import React from 'react';
import Country from './Country';

const SearchResult = ({country, index, onClick}) => {
    return (
        <div>
            {country.name}&nbsp;
            <button onClick={onClick}>show</button>
        </div>
    );
};

const SearchResults = ({countries, selectedCountry, onCountrySelected}) => {
    if (countries.length > 10) {
        return (
            <div>Too many matches, specify another filter</div>
        );
    }

    return (
        <>
            {countries.map((country) => {
                return (
                    <>
                        <SearchResult key={country.alpha3Code}
                                      country={country}
                                      onClick={() => onCountrySelected(country)}/>
                        {selectedCountry.alpha3Code === country.alpha3Code &&
                        <Country country={country}/>
                        }
                    </>
                );
            })}
        </>
    );
};

export default SearchResults;