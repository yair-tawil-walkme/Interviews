import React, { useState } from 'react'
import Header from './Header'
import Table from './Table'
import { getUsers } from '../db/users'

const App = () => {
  const rawData = getUsers();
  const [rows, setRows] = useState(rawData)

  const handleSearch = (event) => {
    const filteredData = rawData.filter((user) => {
      const searchFrase = event.target.value.toLowerCase();
      return (
        user.name.toLowerCase().includes(searchFrase) ||
        user.email.toLowerCase().includes(searchFrase)
      )
    })
    setRows(filteredData);
  }

  return (
    <div>
      <Header handleSearch ={handleSearch} />
      <Table rows={rows} />
    </div>
  )
}

export default App
