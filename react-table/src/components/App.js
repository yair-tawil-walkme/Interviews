import React, { useState } from 'react'
import Header from './Header'
import Table from './Table'
import { getUsers } from '../db/users'

const App = () => {
  const [rows] = useState(getUsers())
    const [tableRows, setTableRows] = useState(rows)

    const handleSearchTable = (searchTerm) => {
            const results = rows.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()) || item.email.toLowerCase().includes(searchTerm.toLowerCase()))
            setTableRows(results)
        }

  return (
    <div>
      <Header handleSearchTable={handleSearchTable}/>
      <Table rows={tableRows} setTableRows={setTableRows} />
    </div>
  )
}

export default App
