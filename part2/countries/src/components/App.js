import React, { useState, useEffect } from "react";
import CountryDetails from "./CountryDetails";
import CountryFilter from "./CountryFilter";
import CountryListItem from "./CountryListItem";
import axios from "axios";

const App = () => {
  const [allCountries, setAllCountries] = useState([]);
  const [textFilter, setTextFilter] = useState("");

  const applyFilter = (text) => {
    setTextFilter(text);
  };

  const selectCountry = (country) => {
    setTextFilter(country.name);
  };

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      setAllCountries(response.data);
    });
  }, []);

  const filteredCountries = textFilter
    ? [...allCountries].filter((x) =>
        x.name.toLowerCase().includes(textFilter.toLowerCase())
      )
    : [];
  return (
    <>
      <CountryFilter textFilter={textFilter} applyFilter={applyFilter} />
      {filteredCountries.length === 1 ? (
        <CountryDetails country={filteredCountries[0]} />
      ) : filteredCountries.length > 10 ? (
        "Too many matches, specify another filter"
      ) : (
        <CountryListItem
          countries={filteredCountries}
          selectCountry={selectCountry}
        />
      )}
    </>
  );
};

export default App;
