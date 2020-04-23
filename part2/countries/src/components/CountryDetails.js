import React, { useState, useEffect } from "react";
import axios from "axios";

const CountryDetails = ({ country }) => {
  const [weatherData, setWeatherData] = useState();
  useEffect(() => {
    const url =
      `http://api.weatherstack.com/current` +
      `?access_key=${process.env.REACT_APP_API_KEY}` +
      `&query=${country.capital}`;
    axios.get(url).then((response) => {
      setWeatherData(response.data);
    });
  }, [country.capital]);

  return [
    <div key={"detailsSection"}>
      <h1>{country.name}</h1>
      <div>{`capital ${country.capital}`}</div>
      <div>{`population ${country.population}`}</div>
      <h2>languages</h2>
      <ul>
        {country.languages.map((x) => (
          <li key={x.name}>{x.name}</li>
        ))}
      </ul>
      <img src={country.flag} height={100} alt="country flag" />
    </div>,
    weatherData ? (
      <div key={"weatherSection"}>
        <h2>{`Weather in ${weatherData.location.name}`}</h2>
        <div>
          <b>temperature:</b> {`${weatherData.current.temperature} Celcius`}
        </div>
        <div>
          <img src={weatherData.current.weather_icons[0]} alt="weather icon" />
        </div>
        <div>
          <b>wind:</b>{" "}
          {`${weatherData.current.wind_speed} km/h direction ${weatherData.current.wind_dir}`}
        </div>
      </div>
    ) : null,
  ];
};

export default CountryDetails;
