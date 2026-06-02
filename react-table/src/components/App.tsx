import { useState } from 'react'
import Header from './Header'
import Table from './Table/Table'
import { getRows } from '../db/rows'

const App = () => {
  const [rows, setRows] = useState(getRows())
  const [searchQuery, setSearchQuery] = useState('')

  const handleDeleteSelected = (selectedKeys: string[]) => {
    setRows((prev) => prev.filter((row) => !selectedKeys.includes(row.name)))
  }

  return (
    <div className="app-shell">
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <Table
        rows={rows}
        searchQuery={searchQuery}
        onDeleteSelected={handleDeleteSelected}
      />
    </div>
  )
}

export default App
