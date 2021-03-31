import React from 'react';

const Persons = ({ persons, search }) => {

    return (
        <>
            {persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()))
                    .map(person => <p key={person.name}>{person.name} {person.number}</p>)}
        </>
    );
}

export default Persons;