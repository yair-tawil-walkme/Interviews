import { useState } from 'react'
import Header from './Header'
import Table from './Table/Table'
import { getRows } from '../db/rows'

// Hi, I added a zip of the code because I had authentication issues that took too much time to solve...
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
