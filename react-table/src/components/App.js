import React, { useState } from 'react'
import Header from './Header'
import Table from './Table'
import { getUsers } from '../db/users'

const App = () => {
  const [rows] = useState(getUsers())
  const [search, updateSearch] = useState('')
  const [sort, updateSort] = useState({ property: 'name', direction: 'asc' })

  return (
    <div>
      <Header search={search} updateSearch={updateSearch} />
      <Table rows={rows} search={search} sort={sort} updateSort={updateSort} />
    </div>
  )
}

export default App
