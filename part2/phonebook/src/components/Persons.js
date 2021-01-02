import React from 'react';
import Person from './Person';

const Persons = ({persons, searchText, onDelete}) => {
    return (
        <ul>
            {persons.filter(person => person.name.toLowerCase().includes(searchText)).map(person => {
                return <Person key={person.name} person={person} onDelete={() => onDelete(person)}/>;
            })}
        </ul>
    );
};

export default Persons;