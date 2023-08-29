import { useEffect, useState } from 'react'
import Header from './Header'
import Table from './Table/Table'
import { getRows } from '../db/rows'
import { Row } from '../db/model'

const ROWS = getRows()

const sortDirectionMap: { asc: number; desc: number } = {
  asc: 1,
  desc: 2,
}

const App = (): JSX.Element => {
  const [search, setSearch] = useState('')
  const [filteredRows, setFilteredRows] = useState(ROWS)
  const [sortObj, setSortObj] = useState<{
    [key: string]: number
  }>({})

  useEffect(() => {
    const filtered = ROWS.filter(
      (row) =>
        row.name.toLowerCase().includes(search) ||
        row.email.toLowerCase().includes(search)
    )
    setFilteredRows(filtered)
  }, [search])

  // TODO:: use lodash debounce
  const handleTyping = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = e.target
    setSearch(value.toLowerCase())
  }

  const handleSorting = (columnName: keyof Row) => {
    const isAsc = sortObj[columnName] === sortDirectionMap.asc
    const sorted = filteredRows.sort((a: Row, b: Row) => {
      if (isAsc) {
        // should be desc
        return b[columnName] > a[columnName] ? 1 : -1
      }
      return a[columnName] > b[columnName] ? 1 : -1
    })

    setSortObj((prev) => ({
      ...prev,
      [columnName]: isAsc ? sortDirectionMap.desc : sortDirectionMap.asc,
    }))

    setFilteredRows(sorted)
  }

  return (
    <div>
      <Header handleTyping={handleTyping} />
      <Table rows={filteredRows} handleSorting={handleSorting} />
    </div>
  )
}

export default App
