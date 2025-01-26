/* eslint-disable prettier/prettier */
import { useState } from 'react'
import Header from './Header'
import Table from './Table/Table'
import { getRows } from '../db/rows'

const App = () => {
  const [rows] = useState(getRows())
  const [searchQuery, setSearchQuery] = useState<string>('')

  return (
    <div>
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
      <Table rows={rows} searchQuery={searchQuery}/>
    </div>
  )
}

export default App
