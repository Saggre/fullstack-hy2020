import React, {useState, useEffect} from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Person from './models/Person';
import recordsService from './services/records';

const App = () => {
    const [persons, setPersons] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [newPerson, setNewPerson] = useState(new Person());

    useEffect(() => {
        recordsService.getAll().then(response => setPersons(response));
    }, []);

    /**
     * Resets the current person
     */
    const resetPerson = () => setNewPerson(new Person());

    /**
     * Handle addition of a new person record
     * @param {Person} person The person to add
     */
    const handleNewRecord = person => {
        if (person.name.length === 0) {
            return;
        }

        if (persons.some(p => p.equals(person))) {
            alert(`${person.name} is already added to phonebook`);
            return;
        }

        recordsService.create(person).then(response => {
            setPersons([...persons, Person.from(response.data)]);
            resetPerson();
        });
    };

    /**
     * Handle deletion of a person record
     * @param {Person} person
     */
    const handleDeleteRecord = person => {
        if (!window.confirm(`Delete ${person.name}?`)) {
            return;
        }

        recordsService.remove(person).then((response) => {
            if (response.status === 200) {
                setPersons(persons.filter(p => !p.equals(person)));
            }
        });
    };

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter text={searchText} onChange={event => {
                setSearchText(event.target.value);
            }}/>
            <h2>Add a new</h2>
            <PersonForm onSubmit={event => {
                event.preventDefault();
                handleNewRecord(newPerson);
            }} onChange={person => {
                setNewPerson(person);
            }} person={newPerson}/>
            <h2>Numbers</h2>
            <Persons persons={persons} searchText={searchText} onDelete={handleDeleteRecord}/>
        </div>
    );
};

export default App;