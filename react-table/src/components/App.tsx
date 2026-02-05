import { useState } from 'react'
import Header from './Header'
import Table from './Table/Table'
import { getRows } from '../db/rows'

const App = () => {
  const [rows] = useState(getRows())
  const [searchTerm, setSearchTerm] = useState('')

  const filteredRows = rows.filter((row) => {
    const term = searchTerm.toLowerCase()
    return row.name.toLowerCase().includes(term) || row.email.toLowerCase().includes(term)
  })

  return (
    <div>
      <Header onSearchChange={setSearchTerm} />
      <Table rows={filteredRows} />
    </div>
  )
}

export default App
