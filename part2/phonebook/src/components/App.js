import React, { useState, useEffect } from "react";
import NumberForm from "./NumberForm";
import NumberFilter from "./NumberFilter";
import NumberDirectory from "./NumberDirectory";
import personService from "../service/Persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [textFilter, setTextFilter] = useState("");
  const addPerson = (newPerson) => {
    setPersons(persons.concat(newPerson));
    personService.create(newPerson).catch((error) => {
      alert("Error adding a new person");
      setPersons(persons.filter((x) => x.id !== newPerson.id));
    });
  };
  const updatePerson = (person) => {
    const originalData = Object.assign(
      {},
      persons.find((x) => x.id === person.id)
    );
    setPersons([...persons.map((x) => (x.id === person.id ? person : x))]);
    personService.update(person).catch((error) => {
      alert("Error updating a new person");
      setPersons([
        ...persons.map((x) => (x.id === person.id ? originalData : x)),
      ]);
    });
  };
  const applyFilter = (filterText) => {
    setTextFilter(filterText);
  };

  const deletePerson = (person) => {
    setPersons(persons.filter((x) => x.id !== person.id));
    personService.remove(person);
  };

  useEffect(() => {
    personService.all().then((data) => {
      setPersons(data);
    });
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <NumberFilter applyFilter={applyFilter} />
      <NumberForm
        persons={persons}
        addPerson={addPerson}
        updatePerson={updatePerson}
      />
      <NumberDirectory
        persons={persons}
        textFilter={textFilter}
        deletePerson={deletePerson}
      />
    </div>
  );
};

export default App;
