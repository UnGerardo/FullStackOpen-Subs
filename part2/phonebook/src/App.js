import React, { useState, useEffect } from 'react'
import requests from './services/requests'
import Filter from './Filter';
import PersonForm from './PersonForm';
import Persons from './Persons';
import Notification from './Notification';

const App = () => {
  const [ persons, setPersons ] = useState([]);
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ search, setSearch ] = useState('');
  const [ message, setMessage ] = useState('');
  const [ notificationType, setNotificationType ] = useState('');

  const addName = (event) => {
    event.preventDefault();
    
    if((persons.filter(person => person.name === newName)).length) {
      updatePerson();
    } else {
      requests.addPerson({
        name: newName,
        number: newNumber,
      }).then(newPerson => {
          setPersons(persons.concat({ id: newPerson.data.id.toString(), name: newPerson.data.name, number: newPerson.data.number }));
          
          setMessage(`Added ${newName}`);
          setNotificationType('notification');
          setTimeout(() => setMessage(''), 3000);
        })
        .catch((error) => {
          setMessage(`${error.response.data.message}`);
          setNotificationType('error');
          setTimeout(() => setMessage(''), 3000);
        });

      setNewName('');
      setNewNumber('');
    }
  }
  
  useEffect(() => {
    requests.getPersons()
            .then(persons => setPersons(persons));
  }, [])

  const deletePerson = (name, id) => {
    if(window.confirm(`Delete ${name}?`)) {
      requests.deleteRequest(id);
      setPersons(persons.filter(person => person.id !== id));
    }
  }

  const updatePerson = () => {
    if(window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
      const id = persons.filter(person => person.name === newName)[0].id;

      requests.updateRequest(id, { number: newNumber })
              .then(updatedPerson => {

                setMessage(`Updated ${newName}`);
                setNotificationType('notification');
                setTimeout(() => setMessage(''), 3000);

                setPersons(persons.map(person => {
                  if(person.id === id) {
                    return updatedPerson.data;
                  }
                  return person;
                }));
              })
              .catch(error => {

                if(error.response.data.name === 'ValidationError') {
                  setMessage(`${error.response.data.message}`);
                  setNotificationType('error');
                  setTimeout(() => setMessage(''), 3000);
                } else {
                  setMessage(`Information of ${newName} has already been removed from the server`);
                  setNotificationType('error');
                  setTimeout(() => setMessage(''), 3000);
                  
                  setPersons(persons.filter(person => person.id !== id));
                }
              });
      setNewName('');
      setNewNumber('');
    }
  }

  return (
    <>
      <h2>Phonebook</h2>
      <Notification message={message} type={notificationType} />
      <Filter search={search} setSearch={setSearch} />

      <h2>Add a new</h2>
      <PersonForm addName={addName} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} />

      <h2>Numbers</h2>
      <Persons persons={persons} setPersons={setPersons} search={search} deletePerson={deletePerson} />
    </>
  )
}

export default App;