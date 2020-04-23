import React, { useState } from "react";
const NumberForm = ({ persons, addPerson }) => {
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");

  const addName = (event) => {
    event.preventDefault();
    if (!newName) {
      return;
    }
    if (persons.map((x) => x.name).includes(newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }
    addPerson({ name: newName, number: newPhone });
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
      <form onSubmit={addName}>
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
