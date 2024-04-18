import { useState } from 'react'
import Header from './Header'
import Table from './Table/Table'
import { getRows } from '../db/rows'

const App = () => {
  const [rows, setRows] = useState(getRows());
  const [search, setSearch] = useState('');

  return (
    <div>
      <Header search={search} setSearch={setSearch}/>
      <Table rows={rows} setRows={setRows} search={search} />
    </div>
  )
}

export default App
