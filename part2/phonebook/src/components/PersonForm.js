import React from 'react';
import Person from '../models/Person';

const PersonForm = ({onSubmit, onChange, person}) => {
    const handleInputChange = event => {
        const newPerson = Person.from(person);
        newPerson[event.target.name] = event.target.value;
        onChange(newPerson);
    };

    return (
        <form onSubmit={onSubmit}>
            <div>
                name: <input name="name" value={person.name} onChange={handleInputChange}/>
            </div>
            <div>
                number: <input name="number" value={person.number} onChange={handleInputChange}/>
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    );
};

export default PersonForm;