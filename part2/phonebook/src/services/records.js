import axios from 'axios';
import Person from '../models/Person';

const baseUrl = 'http://localhost:3001/persons';

/**
 *
 * @returns {Promise}
 */
const getAll = () => {
    return axios.get(baseUrl).then(response => response.data.map(personJson => Person.from(personJson)));
};

/**
 *
 * @param {Person} person
 * @returns {Promise}
 */
const create = person => {
    delete person.id;
    return axios.post(baseUrl, person);
};

/**
 *
 * @param {Person} person
 * @returns {Promise}
 */
const remove = person => {
    return axios.delete(`${baseUrl}/${person.id}`);
};

/**
 *
 * @param {Person} person
 * @returns {Promise}
 */
const update = person => {
    return axios.put(`${baseUrl}/${person.id}`, person);
};

export default {getAll, create, update, remove};