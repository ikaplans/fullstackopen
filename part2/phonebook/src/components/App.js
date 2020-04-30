import React, { useState, useEffect } from "react";
import NumberForm from "./NumberForm";
import NumberFilter from "./NumberFilter";
import NumberDirectory from "./NumberDirectory";
import personService from "../service/Persons";
import Notification from "./Notification";
import "../index.css";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [textFilter, setTextFilter] = useState("");
  const [notificationMessage, setNotificationMessage] = useState();

  const showNotificationMessage = (message, isSuccess) => {
    setNotificationMessage({ isSuccess: isSuccess, text: message });
    setTimeout(() => {
      setNotificationMessage(null);
    }, 5000);
  };

  const addPerson = (newPerson) => {
    let success = true;
    const newPersons = persons.concat(newPerson);
    setPersons(newPersons);
    personService.create(newPerson).catch((error) => {
      success = false;
      showNotificationMessage(
        `Encountered an error while adding ${newPerson.name}`,
        false
      );
      setPersons(newPersons.filter((x) => x.id !== newPerson.id));
    });
    if (success) {
      showNotificationMessage(`Successfully added ${newPerson.name}`, true);
    }
  };

  const updatePerson = (person) => {
    let success = true;
    const originalData = Object.assign(
      {},
      persons.find((x) => x.id === person.id)
    );
    const newPersons = [
      ...persons.map((x) => (x.id === person.id ? person : x)),
    ];
    setPersons(newPersons);
    personService.update(person).catch((error) => {
      success = false;
      showNotificationMessage(
        `Encountered an error while updating ${person.name}`,
        false
      );
      setPersons([
        ...newPersons.map((x) => (x.id === person.id ? originalData : x)),
      ]);
    });
    if (success) {
      showNotificationMessage(`Successfully updated ${person.name}`, true);
    }
  };

  const deletePerson = (person) => {
    let success = true;
    const originalData = Object.assign(
      {},
      persons.find((x) => x.id === person.id)
    );
    const newPersons = persons.filter((x) => x.id !== person.id);
    setPersons(newPersons);
    personService.remove(person).catch((error) => {
      success = false;
      showNotificationMessage(
        `Encountered an error while deleting ${person.name}`,
        false
      );
      setPersons(newPersons.concat(originalData));
    });
    if (success) {
      showNotificationMessage(`Successfully deleted ${person.name}`, true);
    }
  };

  const applyFilter = (filterText) => {
    setTextFilter(filterText);
  };

  useEffect(() => {
    personService.all().then((data) => {
      setPersons(data);
    });
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} />
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
