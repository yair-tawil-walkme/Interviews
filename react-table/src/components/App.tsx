import { useState } from 'react'
import Header from './Header'
import Table from './Table/Table'
import { getRows } from '../db/rows'

const App = () => {
  const [rows] = useState(getRows())
  const [input, setInput] = useState<string>('');

  return (
    <div>
      <Header setInput={setInput}/>
      <Table rows={rows} input={input}/>
    </div>
  )
}

export default App
