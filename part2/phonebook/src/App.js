import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]);

  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ search, setSearch ] = useState('');

  const addName = (event) => {
    event.preventDefault();

    if((persons.filter(person => person.name === newName)).length) {
      alert(`${newName} is already added to phonebook`);
    } else {
      setPersons(persons.concat({ name: newName, number: newNumber }));
      setNewName('');
      setNewNumber('');
    }
  }

  return (
    <>
      <h2>Phonebook</h2>
      <span>filter shown with</span>
      <input value={search} onChange={(event) => setSearch(event.target.value)} />
      <h2>Add a new</h2>
      <form onSubmit={addName}>
        <div>
          name: <input 
                  value={newName}
                  onChange={(event) => setNewName(event.target.value)} />
        </div>
        <div>
          number: <input 
                  value={newNumber}
                  onChange={(event) => setNewNumber(event.target.value)} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()))
              .map(person => <p key={person.name}>{person.name} {person.number}</p>)}
    </>
  )
}

export default App