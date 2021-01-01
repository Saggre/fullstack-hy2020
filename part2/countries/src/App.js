import React, {useState, useEffect} from 'react';
import axios from 'axios';
import SearchForm from './components/SearchForm';
import SearchResults from './components/SearchResults';

const App = () => {
    const weatherApiKey = process.env.REACT_APP_WEATHER_API_KEY;
    const [searchText, setSearchText] = useState('');
    const [countries, setCountries] = useState([]);
    const [queryCountries, setQueryCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState(null);

    useEffect(() => {
        axios.get('https://restcountries.eu/rest/v2/all').then(response => {
            setCountries(response.data);
        });
    }, []);

    /**
     * Gets a country object from memory where its name contains a string
     * @param query
     */
    const doCountryQuery = query => {
        setQueryCountries(countries.filter((country) => {
            return country.name.toLowerCase().includes(query);
        }));
    };

    /**
     * Gets weather with a query and calls the callback function on success
     * @param query
     * @param onSuccess
     */
    const getCountryWeather = (query, onSuccess) => {
        axios.get('http://api.weatherstack.com/forecast', {
            params: {
                access_key: weatherApiKey,
                query: query
            }
        }).then(response => {
            if (response.status !== 200 || 'error' in response.data) {
                return;
            }

            onSuccess(response.data);
        });
    };

    /**
     * Handles country selection
     * @param country
     */
    const handleCountrySelection = country => {
        setSelectedCountry({...country});
        getCountryWeather(country.capital, (weather) => {
            setSelectedCountry({...country, weather: weather});
        });
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
                           onCountrySelected={country => handleCountrySelection(country)}/>
        </>
    );
};

export default App;
