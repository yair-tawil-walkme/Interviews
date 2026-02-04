import React, { useEffect, useState } from 'react'
import Header from './Header'
import Table from './Table/Table'
import { getRows } from '../db/rows'

const App = () => {
  const [rows] = useState(getRows());
  const [filteredRows, setFilteredRows] = useState(rows);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const onSearchChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  useEffect(() => {
    const lowercasedTerm = searchTerm.toLowerCase();
    const newFilteredRows = rows.filter((row) => {
      return (
        row.name.toLowerCase().includes(lowercasedTerm) ||
        row.email.toLowerCase().includes(lowercasedTerm)
      );
    });
    setFilteredRows(newFilteredRows);
  }, [searchTerm, rows]);

  return (
    <div>
      <Header onSearchChanged={onSearchChanged} />
      <Table rows={filteredRows} />
    </div>
  )
}

export default App
