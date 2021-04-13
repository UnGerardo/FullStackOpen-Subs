const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

app = express();

app.use(cors())
app.use(express.json());
app.use(morgan((tokens, req, res) => {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms',
        JSON.stringify(req.body)
    ].join(' ')
}))

let persons = [
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
    const id = Number(request.params.id);
    const person = persons.find(person => person.id === id);
    
    if(person) {
        return response.json(person);
    }
    response.status(404).end();
});

app.get('/info', (request, response) => {
    response.send(`<p>Phonebook has info for ${persons.length} people.</p> <p>${new Date()}</p>`)
})

app.post('/api/persons', (request, response) => {
    const newPerson = request.body;

    if(!newPerson.name || !newPerson.number) {
        return response.status(404).json({
            error: 'content missing'
        });
    } else if(persons.find(person => person.name === newPerson.name)) {
        return response.status(404).json({
            error: 'name already in phonebook'
        });
    }

    persons = persons.concat({
        id: Math.floor(Math.random() * 1000000 + 1),
        name: newPerson.name,
        number: newPerson.number
    })

    response.status(201).end();
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    persons = persons.filter(person => person.id !== id);

    response.status(204).end();
})

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});