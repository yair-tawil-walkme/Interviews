import React, { useState } from 'react'
import Header from './Header'
import Table from './Table'
import { getUsers } from '../db/users'

const App = () => {
  const [rows] = useState(getUsers())

  return (
    <div>
      <Header />
      <Table rows={rows} />
    </div>
  )
}

export default App
