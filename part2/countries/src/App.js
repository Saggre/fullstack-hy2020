import React, {useState, useEffect} from 'react';
import axios from 'axios';
import SearchForm from './components/SearchForm';
import SearchResults from './components/SearchResults';

const App = () => {
    const [searchText, setSearchText] = useState('');
    const [countries, setCountries] = useState([]);
    const [queryCountries, setQueryCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState(null);

    useEffect(() => {
        axios.get('https://restcountries.eu/rest/v2/all').then(response => {
            setCountries(response.data);
        });
    }, []);

    const doCountryQuery = query => {
        setQueryCountries(countries.filter((country) => {
            return country.name.toLowerCase().includes(query);
        }));
    };

    return (
        <>
            <SearchForm value={searchText} onChange={event => {
                const query = event.target.value;
                setSearchText(query);
                doCountryQuery(query);
            }}/>
            <SearchResults countries={queryCountries}
                           selectedCountry={selectedCountry}
                           onCountrySelected={(country) => {
                               setSelectedCountry(country);
                           }}/>
        </>
    );
};

export default App;
