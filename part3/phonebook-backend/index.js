const express = require('express');

app = express();

const persons = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "040-123456",
    },
    {
        id: 2,
        name: "Ada Lovelace",
        number: "39-44-5323523",
    },
    {
        id: 3,
        name: "Dan Abramov",
        number: "12-43-234345",
    },
    {
        id: 4,
        name: "Mary Poppendieck",
        number: "39-23-6423122",
    }
]

app.get('/api/persons', (request, response) => {
    response.json(persons);
});

app.get('/api/persons/:id', (request, response) => {
    console.log(request.params);
    const id = request.params.id;
    response.json(persons.find(person => person.id = id));
});

app.get('/info', (request, response) => {
    response.send(`<p>Phonebook has info for ${persons.length} people.</p> <p>${new Date()}</p>`)
})

app.listen(3001);
console.log('Listening on port 3001');