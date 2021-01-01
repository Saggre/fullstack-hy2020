import React from 'react';

const Weather = ({weather}) => {
    return (
        <>
            <div><b>temperature:</b> {weather.current.temperature} Celsius</div>
            {weather.current.weather_icons.map(icon => {
                return (<img key={icon} className='icon icon--weather' src={icon} alt={weather.location.country}/>);
            })}
            <div><b>wind:</b> {weather.current.wind_speed} mph direction {weather.current.wind_dir}</div>
        </>
    );
};

export default Weather;