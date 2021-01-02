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

        for (let i = 0; i < persons.length; i++) {
            if (person.equals(persons[i])) {
                person.id = persons[i].id;

                if (window.confirm(`${person.name} is already added to phonebook, replace the old number with a new one?`)) {
                    handleUpdateRecord(person);
                }

                return;
            }
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

        recordsService.remove(person).then(response => {
            if (response.status === 200) {
                setPersons(persons.filter(p => !p.equals(person)));
            }
        });
    };

    /**
     * Handle updating a person record
     * @param {Person} person
     */
    const handleUpdateRecord = person => {
        recordsService.update(person).then(response => {
            if (response.status === 200) {
                setPersons(persons.map(p => p.id === person.id ? person : p));
                resetPerson();
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