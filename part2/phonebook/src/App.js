import React, {useState, useEffect} from 'react';
import axios from 'axios'
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from "./components/Persons";

const App = () => {
    const [persons, setPersons] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [newPerson, setNewPerson] = useState({
        name: '',
        number: ''
    });

    useEffect(() => {
        axios.get('http://localhost:3001/persons').then(response => {
            setPersons(response.data);
        });
    }, []);

    const getPersonIndex = (name) => {
        for (let i = 0; i < persons.length; i++) {
            if (persons[i].name === name) {
                return i;
            }
        }

        return false;
    }

    const addPerson = (event) => {
        event.preventDefault();

        if (newPerson.name.length === 0) {
            return;
        }

        if (getPersonIndex(newPerson.name)) {
            alert(`${newPerson.name} is already added to phonebook`);
            return;
        }

        setPersons([
            ...persons,
            newPerson
        ]);

        setNewPerson({
            name: '',
            number: ''
        });
    };

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter text={searchText} onChange={event => {
                setSearchText(event.target.value);
            }}/>
            <h2>Add a new</h2>
            <PersonForm onSubmit={addPerson} onChange={person => {
                setNewPerson(person);
            }} person={newPerson}/>
            <h2>Numbers</h2>
            <Persons persons={persons} searchText={searchText}/>
        </div>
    );
};

export default App;