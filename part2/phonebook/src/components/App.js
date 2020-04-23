import React, { useState, useEffect } from "react";
import NumberForm from "./NumberForm";
import axios from "axios";
import NumberFilter from "./NumberFilter";
import NumberDirectory from "./NumberDirectory";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [textFilter, setTextFilter] = useState("");
  const addPerson = (newPerson) => {
    setPersons(persons.concat(newPerson));
  };
  const applyFilter = (filterText) => {
    setTextFilter(filterText);
  };

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    });
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <NumberFilter applyFilter={applyFilter} />
      <NumberForm persons={persons} addPerson={addPerson} />
      <NumberDirectory persons={persons} textFilter={textFilter} />
    </div>
  );
};

export default App;
