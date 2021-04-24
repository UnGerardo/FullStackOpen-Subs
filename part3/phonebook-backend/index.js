require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const Person = require('./models/person');

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

app.get('/api/persons', (request, response) => {
    Person.find({})
        .then(persons => {
            response.json(persons);
        })
});

// app.get('/api/persons/:id', (request, response) => {
//     const id = Number(request.params.id);
//     const person = persons.find(person => person.id === id);
    
//     if(person) {
//         return response.json(person);
//     }
//     response.status(404).end();
// });

// app.get('/info', (request, response) => {
//     response.send(`<p>Phonebook has info for ${persons.length} people.</p> <p>${new Date()}</p>`)
// })

app.post('/api/persons', (request, response) => {
    const newPerson = request.body;

    if(!newPerson.name || !newPerson.number) {
        return response.status(400).json({ error: 'content missing' });
    }

    const person = Person({
        name: newPerson.name,
        number: newPerson.number
    });

    person.save().then(savedPerson => {
        response.status(201).json(savedPerson);
    });
})

app.put('/api/persons/:id', (request, response) => {
    const newNumber = { number: request.body.number }; 

    Person.findByIdAndUpdate(request.params.id, newNumber, { new: true })
        .then(updatedPerson => {
            response.json(updatedPerson);
        })
        .catch(error => next(error));
});

app.delete('/api/persons/:id', (request, response) => {
    
    Person.findByIdAndRemove(request.params.id)
        .then(person => {
            console.log(`------------------\nDELETED ${person.name}\n------------------`)
            response.status(204).end();
        })
        .catch(error => next(error));
})

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

const errorHandler = (error, request, response, next) => {
    console.log(error.message);

    if(error.name === 'CastError') {
        return response.status(400).send({ error: 'Malformatted id '});
    }

    next(error);
}

app.use(errorHandler);