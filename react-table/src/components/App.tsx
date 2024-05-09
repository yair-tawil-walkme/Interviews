import { useMemo, useState } from 'react'
import Header from './Header'
import Table from './Table/Table'
import { getRows } from '../db/rows'
import { sortRows, useDeletedRows, useTableFilterData } from '../utils/row'

const App = () => {
  const [rows] = useState(getRows())

  const [tableFilterData] = useTableFilterData()
  const [deletedRows] = useDeletedRows()

  const filteredRows = useMemo(() => {
    const sortedRows = sortRows(rows, tableFilterData.sort)

    return sortedRows.filter(row => {
      if (deletedRows.includes(row.id)) return false

      if (
        row.name.toLowerCase().includes(tableFilterData.search.toLowerCase()) ||
        row.email.toLowerCase().includes(tableFilterData.search.toLowerCase())
      )
        return true
      return false
    })
  }, [tableFilterData, rows, deletedRows])


  return (
    <div>
      <Header />
      <Table rows={filteredRows} />
    </div>
  )
}

export default App
