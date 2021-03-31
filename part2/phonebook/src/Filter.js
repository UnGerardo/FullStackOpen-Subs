import React from 'react';

const Filter = ({ search, setSearch }) => {

    return (
        <>
            filter shown with <input value={search} onChange={(event) => setSearch(event.target.value)} />
        </>
    );
}

export default Filter;