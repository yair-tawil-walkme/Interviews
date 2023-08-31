import { useState, useEffect } from 'react'
import Header from './Header'
import Table from './Table/Table'
import { getRows } from '../db/rows'
import { Row } from '../db/model'

const App = () => {
  const [rows] = useState(getRows())
  const [filteredRow,setFilteredRow] = useState<Row[]>([])
  const [searchText, setSearchText] = useState("")
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>()
  
  const filterByText = (searchText: string) => {
    const filteredData = rows.filter(row => {
      return row.name.toLowerCase().includes(searchText) ||
        row.email.toLowerCase().includes(searchText)
    });
    setFilteredRow(filteredData)
  }

  useEffect(() => {
    if (searchText) {
      clearTimeout(timeoutId);
      const debounceId: NodeJS.Timeout = setTimeout(() => {
        filterByText(searchText)
      }, 1000);
      setTimeoutId(debounceId)
    }else{
      setFilteredRow(rows)
    }
    
  }, [searchText]);

  

  return (
    <div>
      <Header setSearchText={setSearchText} />
      <Table rows={filteredRow} />
    </div>
  )
}

export default App
