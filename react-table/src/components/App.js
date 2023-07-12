import React, { useState } from 'react'
import Header from './Header'
import Table from './Table'
import { getUsers } from '../db/users'
import { useTableFilters } from '../hooks/useTableFilters'
import { useDeleteRow } from '../hooks/useDeleteRow'

const App = () => {
  const [rows, setRows] = useState(getUsers())
  const { filteredRows, filtersData, handleSearch, handleSort } = useTableFilters(rows);
  const handleDeleteRows = useDeleteRow(setRows)

  return (
    <div>
      <Header handleSearch={handleSearch} />
      <Table
        rows={filteredRows}
        order={filtersData.order}
        orderBy={filtersData.orderBy}
        handleSort={handleSort}
        handleDeleteRows={handleDeleteRows}
      />
    </div>
  )
}

export default App
