const mongoose = require('mongoose');

//check if password was passed as an argument
if(process.argv.length < 3) {
    console.log('Please provide the password: node mongo.js <password>');
    process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://gerardo:${password}@part3.e9cpj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true, useCreateIndex: true });

const personSchema = new mongoose.Schema({
    id: Number,
    name: String,
    number: String,
});

const Person = mongoose.model('Person', personSchema);

if(process.argv.length === 5) {
    const newName = process.argv[3];
    const newNumber = process.argv[4];

    const person = new Person({
        id: Math.floor(Math.random() * 1000000 + 1),
        name: newName,
        number: newNumber,
    });

    person.save().then(result => {
        console.log(`Added ${newName} number: ${newNumber} to phonebook`);
        mongoose.connection.close();
    });
} else if(process.argv.length === 3) {
    console.log('Phonebook:');
    Person.find({})
         .then(result => {
             for(let i = 0; i < result.length; i++) {
                 console.log(`${result[i].name} ${result[i].number}`)
             }

             //be careful not to close before promises have the time to be resolved
             mongoose.connection.close();
         });
} else {
    console.log('Missing information');
    mongoose.connection.close();
}