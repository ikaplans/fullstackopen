import React from "react";

const CountryListItem = ({ countries, selectCountry }) =>
  countries.map((x) => {
    return (
      <div key={x.alpha3Code}>
        {x.name}
        <button onClick={() => selectCountry(x)}>show</button>
      </div>
    );
  });

export default CountryListItem;
