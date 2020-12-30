import React from 'react'

const Filter = ({searchText, onChange}) => {
    return (
        <>
            filter shown with: <input value={searchText} onChange={onChange}/>
        </>
    );
};

export default Filter;