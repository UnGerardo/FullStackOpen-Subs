require('dotenv').config();

const info = (...params) => {
    if(process.env.NODE_ENV !== 'test') {
        console.log('--------------INFO----------------');
        console.log(...params);
        console.log('--------------INFO----------------');
    }
}

const error = (...params) => {
    if(process.env.NODE_ENV !== 'test') {
        console.log('--------------ERROR----------------');
        console.error(...params);
        console.log('--------------ERROR----------------');
    }
}

module.exports = {
    info,
    error
}