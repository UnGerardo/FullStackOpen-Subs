import React, { useState, useEffect } from 'react'
import requests from './services/requests'
import Filter from './Filter';
import PersonForm from './PersonForm';
import Persons from './Persons';

const App = () => {
  const [ persons, setPersons ] = useState([]);
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ search, setSearch ] = useState('');

  const addName = (event) => {
    event.preventDefault();
    
    if((persons.filter(person => person.name === newName)).length) {
      alert(`${newName} is already added to phonebook`);
    } else {
      requests.addPerson({
        name: newName,
        number: newNumber,
        id: persons.length + 1
      })
      setPersons(persons.concat({ name: newName, number: newNumber, id: persons.length + 1 }));
      setNewName('');
      setNewNumber('');
    }
  }
  
  useEffect(() => {
    requests.getPersons()
            .then(persons => setPersons(persons));
  }, [])

  return (
    <>
      <h2>Phonebook</h2>
      <Filter search={search} setSearch={setSearch} />

      <h2>Add a new</h2>
      <PersonForm addName={addName} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} />

      <h2>Numbers</h2>
      <Persons persons={persons} setPersons={setPersons} search={search} />
    </>
  )
}

export default App;