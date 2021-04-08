import axios from 'axios';

const baseUrl = 'http://localhost:3001/persons';

const getPersons = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data);
}

const addPerson = (newPerson) => {
    return axios.post(baseUrl, newPerson);
}

const requests = { getPersons, addPerson }

export default requests;