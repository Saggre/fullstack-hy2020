import React from 'react';

const Person = ({person, onDelete}) => {
    return (
        <>
            <li>
                {person.name} {person.number}&nbsp;
                <button onClick={onDelete}>delete</button>
            </li>
        </>
    );
};

export default Person;