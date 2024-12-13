import { useMemo, useState, ChangeEvent } from 'react'
import Header from './Header'
import Table from './Table/Table'
import { getRows } from '../db/rows'

const App = () => {
  const [rows,setRows] = useState(getRows())
  const [searchQuery,setSearchQuery] = useState('');
  
  const filteredRows = useMemo(() => {
      return rows.filter(
        (row) =>
          row.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          row.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
  },[rows,searchQuery]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }
  
  const handleDelete = (names: string[]) => {
    setRows(rows.filter((row) => !names.includes(row.name)));
  }

  return (
    <div>
      <Header searchQuery = {searchQuery} onSearchChange = {handleSearchChange}/>
      <Table rows={filteredRows} onDelete = {handleDelete}/>
    </div>
  )
}

export default App
