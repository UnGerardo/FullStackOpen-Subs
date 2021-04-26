
const info = (...params) => {
    console.log('--------------INFO----------------');
    console.log(...params);
    console.log('--------------INFO----------------');
}

const error = (...params) => {
    console.log('--------------ERROR----------------');
    console.error(...params);
    console.log('--------------ERROR----------------');
}

module.exports = {
    info,
    error
}