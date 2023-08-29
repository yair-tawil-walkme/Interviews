import { useState } from 'react'
import Header from './Header'
import Table from './Table/Table'
import { getRows } from '../db/rows'

const App = () => {
  const [rows] = useState(getRows())

  return (
    <div>
      <Header />
      <Table rows={rows} />
    </div>
  )
}

export default App
