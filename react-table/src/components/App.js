import React, { useState } from 'react';
import Header from './Header';
import Table from './Table';
import { getUsers } from '../db/users';

const App = ({ defaultFilter = '' }) => {
    const [rows, setRows] = useState(getUsers());
    const [filter, setFilter] = useState(defaultFilter);
    const [sort, setSort] = useState(0);
    const [checked, setChecked] = useState({});

    const filteredRows = rows.filter(({ name = '', email = '' }) => email?.toLowerCase()
        .includes(filter?.toLowerCase()) || name.toLowerCase().includes(filter.toLowerCase()));

    let sortedRows = [...filteredRows];
    if (sort > 0) {
        sortedRows.sort((a, b) => {
            return sort === 1 ? a.name <= b.name : a.name >= b.name;
        });
    }

    return (
        <div>
            <Header setFilter={ setFilter } filter={ filter }/>
            <Table rows={ sortedRows } setSort={ setSort } setRows={ setRows } checked={ checked }
                   setChecked={ setChecked() }/>
        </div>
    );
};

export default App;
