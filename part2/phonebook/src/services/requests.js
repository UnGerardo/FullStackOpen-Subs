import axios from 'axios';

const baseUrl = 'api/persons';

const getPersons = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data);
}

const addPerson = (newPerson) => {
    return axios.post(baseUrl, newPerson);
}

const deleteRequest = (id) => {
    axios.delete(`${baseUrl}/${id}`);
}

const updateRequest = (id, updatedPerson) => {
    return axios.put(`${baseUrl}/${id}`, updatedPerson)
}

const requests = { getPersons, addPerson, deleteRequest, updateRequest }

export default requests;