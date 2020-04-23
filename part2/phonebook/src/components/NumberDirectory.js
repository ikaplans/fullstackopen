import React from "react";

const NumberDirectory = ({ persons, textFilter }) => {
  return (
    <>
      <h2>Numbers</h2>
      {persons
        .filter(
          (x) =>
            !textFilter ||
            x.name.toLowerCase().includes(textFilter.toLowerCase())
        )
        .map((x) => (
          <div key={x.name}>{`${x.name} ${x.number}`}</div>
        ))}
    </>
  );
};

export default NumberDirectory;
