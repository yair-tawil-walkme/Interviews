import { useEffect, useState } from 'react'
import Header from './Header'
import Table from './Table/Table'
import { getRows } from '../db/rows'

const App = () => {
  const [rows,setRows] = useState(getRows())
  const [searchInput,setSearchInput] = useState('')

  const handleDelete = (selected: string[]) => {
    setRows(prevRows => prevRows.filter(row => !selected.includes(row.name)));
  };

  return (
    <div>
      <Header setSearchValue={setSearchInput}/>
      <Table rows={rows} searchInput={searchInput} onDelete={handleDelete}/>
    </div>
  )
}

export default App
