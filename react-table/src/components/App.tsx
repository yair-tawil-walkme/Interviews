import { useCallback, useEffect, useState } from 'react'
import Header from './Header'
import Table from './Table/Table'
import { getRows } from '../db/rows'
import { debounce } from 'lodash'
import { Row } from '../db/model'

const App = () => {
  const [rows] = useState(getRows())
  const [filteredRows, setFilteredRows] = useState<Row[]>([])
  const [searchTerm, setSearchTerm] = useState<string>('')

  useEffect(() => {
    setFilteredRows(rows)
  }, [])

  const handleSearch = useCallback(
    (value: string) => {
      const filtered = rows.filter(
        (row) =>
          row.email.toLowerCase().includes(value.toLowerCase()) ||
          row.name.toLowerCase().includes(value.toLowerCase())
      )
      setFilteredRows(filtered)
    },
    [rows]
  )

  const debouncedSearch = useCallback(debounce(handleSearch, 300), [
    handleSearch,
  ])

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value)
      debouncedSearch(event.target.value)
    },
    [debouncedSearch]
  )

  return (
    <div>
      <Header searchTerm={searchTerm} handleChange={handleChange} />
      <Table rows={filteredRows} setRows={setFilteredRows}/>
    </div>
  )
}

export default App
