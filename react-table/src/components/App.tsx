import { useState } from 'react'
import Header from './Header'
import Table from './Table/Table'
import { getRows } from '../db/rows'

const App = () => {
  const [rows] = useState(getRows())
  const [searchText, setSearchText] = useState('');

  return (
    <div>
      <Header searchText={searchText} onChange={setSearchText}/>
      <Table rows={rows} searchText={searchText} />
    </div>
  )
}

export default App
