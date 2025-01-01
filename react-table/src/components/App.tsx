import { useState } from 'react'
import Header from './Header'
import Table from './Table/Table'
import { getRows } from '../db/rows'
import { Row } from '../db/model'
import { Button } from '@mui/material'

export type Sort = 'no-sort' | 'asc' | 'desc'

const sortRows = (rows: Row[], sortType: Sort) => {
  if (sortType === 'no-sort') {
    return rows
  }
  return rows.sort((a, b) => {
    if (sortType === 'asc') {
      return a.name.localeCompare(b.name, 'en', { sensitivity: 'base' })
    }
    if (sortType === 'desc') {
      return b.name.localeCompare(a.name, 'en', { sensitivity: 'base' })
    }
    return 0
  })
}

const App = () => {
  const [rows, setRows] = useState(getRows())
  const [searchStr, setSearchStr] = useState('')
  const [sortType, setSortType] = useState<Sort>('no-sort')
  const [selectedRows, setSelectedRows] = useState<number[]>([])

  const toggleSort = () => {
    setSortType((prev) =>
      prev === 'desc' || prev === 'no-sort' ? 'asc' : 'desc'
    )
  }

  const filtered = rows.filter(
    (row) =>
      row.name.toLowerCase().includes(searchStr.toLowerCase()) ||
      row.email.toLowerCase().includes(searchStr.toLowerCase())
  )

  const filteredAndSorted = sortRows(filtered, sortType)

  const handleDelete = () => {
    setRows((prev) => prev.filter((row) => !selectedRows.includes(row.id)))
  }

  return (
    <div>
      <Header searchStr={searchStr} setSearchStr={setSearchStr} />
      <Table
        sortType={sortType}
        rows={filteredAndSorted}
        toggleSort={toggleSort}
        setSelectedRows={setSelectedRows}
      />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Button onClick={handleDelete} variant="contained" size="small">
          Delete
        </Button>
      </div>
    </div>
  )
}

export default App
