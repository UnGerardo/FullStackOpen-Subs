import React from 'react';

const Persons = ({ persons, search, deletePerson }) => {

    return (
        <>
            {persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()))
                    .map(person => {
                        return  <p key={person.name}>
                                    {person.name} {person.number} 
                                    <button onClick={() => deletePerson(person.name, person.id)}>Delete</button> 
                                </p>
                    })}
        </>
    );
}

export default Persons;