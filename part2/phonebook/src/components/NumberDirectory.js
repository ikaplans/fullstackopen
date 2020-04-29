import React from "react";

const NumberDirectory = ({ persons, textFilter, deletePerson }) => {
  const onDeletePerson = (person) => {
    if (!window.confirm(`Are you sure you want to delete ${person.name} ?`)) {
      return;
    }
    deletePerson(person);
  };
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
          <div key={x.name}>
            {`${x.name} ${x.number}`}
            <button
              onClick={() => {
                onDeletePerson(x);
              }}
            >
              delete
            </button>
          </div>
        ))}
    </>
  );
};

export default NumberDirectory;
