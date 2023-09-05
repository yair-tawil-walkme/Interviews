import { useState } from 'react'
import Header from './Header'
import Table from './Table/Table'
import { getRows } from '../db/rows'

const App = () => {
  const [rows] = useState(getRows())
  const [displayRows, setDisplayRows] = useState(rows)

  return (
    <div>
      <Header rows={rows} setDisplayRows={setDisplayRows}/>
      <Table displayRows={displayRows} setDisplayRows={setDisplayRows}/>
    </div>
  )
}

export default App
