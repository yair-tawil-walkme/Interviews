import { useMemo, useState } from 'react'
import Box from '@mui/material/Box'
import Header from './Header'
import Table from './Table/Table'
import { getRows } from '../db/rows'
import { Row } from '../db/model'

const App = () => {
  const [rows, setRows] = useState<Row[]>(getRows())
  const [searchText, setSearchText] = useState('')

  const handleDeleteRows = (idsToDelete: number[]) => {
    if (idsToDelete.length === 0) return
    setRows((prev) => prev.filter((row) => !idsToDelete.includes(row.id)))
  }

  const filteredRows = useMemo(() => {
    const query = searchText.trim().toLowerCase()
    if (query.length === 0) return rows

    return rows.filter((row) => {
      const name = row.name.toLowerCase()
      const email = row.email.toLowerCase()
      return name.includes(query) || email.includes(query)
    })
  }, [rows, searchText])

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Header searchText={searchText} onSearchTextChange={setSearchText} />
      <Box sx={{ p: 2 }}>
        <Table rows={filteredRows} onDeleteRows={handleDeleteRows} />
      </Box>
    </Box>
  )
}

export default App
