import React from "react";

const CountryDetails = ({ textFilter, applyFilter }) => {
  const onFilterTextChange = (event) => {
    applyFilter(event.target.value);
  };

  return (
    <div>
      find countries <input value={textFilter} onChange={onFilterTextChange} />
    </div>
  );
};

export default CountryDetails;
