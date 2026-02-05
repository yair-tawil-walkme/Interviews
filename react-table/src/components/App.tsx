import { useState } from 'react'
import Header from './Header'
import Table from './Table/Table'
import { getRows } from '../db/rows'

const App = () => {
  const [rows, setRows] = useState(getRows())
  const [searchTerm, setSearchTerm] = useState('')

  const filteredRows = rows.filter((row) => {
    const term = searchTerm.toLowerCase()
    return row.name.toLowerCase().includes(term) || row.email.toLowerCase().includes(term)
  })

  const handleDelete = (ids: Set<number>) => {
    setRows((prev) => prev.filter((row) => !ids.has(row.id)))
  }

  return (
    <div className="app-layout">
      <Header onSearchChange={setSearchTerm} />
      <Table rows={filteredRows} onDelete={handleDelete} />
    </div>
  )
}

export default App
