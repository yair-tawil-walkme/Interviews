import React, { useState } from 'react'
import Header from './Header'
import Table from './Table'
import { getUsers } from '../db/users'

const App = () => {
  const [rows] = useState(getUsers())
  const [filterString, setFilterString] = useState('')

  function handleFilterInput(e) {
    setFilterString(e.target.value.toLowerCase())
  }

  return (
    <div>
      <Header handleFilterInput={handleFilterInput} />
      <Table rows={rows} filterString={filterString} />
    </div>
  )
}

export default App
