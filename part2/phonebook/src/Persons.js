import React, { useEffect } from 'react';
import axios from 'axios';

const Persons = ({ persons, setPersons, search }) => {

    useEffect(() => {
        axios.get('http://localhost:3001/persons')
             .then(response => setPersons(response.data))
    }, [])

    return (
        <>
            {persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()))
                    .map(person => <p key={person.name}>{person.name} {person.number}</p>)}
        </>
    );
}

export default Persons;