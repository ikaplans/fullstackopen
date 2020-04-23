import React, { useState } from "react";

const NumberFilter = ({ applyFilter }) => {
  const [filterText, setFilterText] = useState("");
  const handleFilterTextChange = (event) => {
    setFilterText(event.target.value);
    applyFilter(event.target.value);
  };
  return (
    <div>
      filter shown with:
      <input value={filterText} onChange={handleFilterTextChange} />
    </div>
  );
};

export default NumberFilter;
