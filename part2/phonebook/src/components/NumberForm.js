import React, { useState } from "react";
const NumberForm = ({ persons, addPerson, updatePerson }) => {
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");

  const onAddPerson = (event) => {
    const newId = Math.max(...persons.map((x) => x.id)) + 1;
    event.preventDefault();
    if (!newName) {
      return;
    }
    const existingPerson = persons.find((x) => x.name === newName);
    if (existingPerson !== undefined) {
      if (
        window.confirm(
          `${existingPerson.name} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        updatePerson(Object.assign({}, existingPerson, { number: newPhone }));
      }
    } else {
      addPerson({ name: newName, number: newPhone, id: newId });
    }
    setNewName("");
    setNewPhone("");
  };

  const handleNewNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNewPhoneChange = (event) => {
    setNewPhone(event.target.value);
  };

  return (
    <>
      <h2>Add a new</h2>
      <form onSubmit={onAddPerson}>
        <div>
          <div>
            name: <input value={newName} onChange={handleNewNameChange} />
          </div>
          <div>
            number:
            <input value={newPhone} onChange={handleNewPhoneChange} />
          </div>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  );
};

export default NumberForm;
