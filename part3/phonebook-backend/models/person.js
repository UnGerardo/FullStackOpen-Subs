const mongoose = require('mongoose');

const url = process.env.MONGODB_URI;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true, useCreateIndex: true })
        .then(result => {
            console.log('Connected to MongoDB');
        })
        .catch(error => {
            console.log('ERROR CONNECTING TO MONGODB', error.message);
        });

const personSchema = new mongoose.Schema({
    id: Number,
    name: String,
    number: String,
});

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
})

const Person = mongoose.model('Person', personSchema);

module.exports = Person;