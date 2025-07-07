import { useCallback, useMemo, useState } from 'react'
import Header from './Header'
import Table from './Table/Table'
import { getRows } from '../db/rows'

const App = () => {
  const [rows] = useState(getRows())
  const [filter, setFilter] = useState('')
  const [orderBy, setOrderBy] = useState('name')
  const [order, setOrder] = useState<'asc' | 'desc'>('asc')

  const handleSort = (column: string) => {
    if (orderBy === column) {
      setOrder(order === 'asc' ? 'desc' : 'asc')
    } else {
      setOrderBy(column)
      setOrder('asc')
    }
  }

  const handleFilter = useCallback((value: string) => {
    setFilter(value)
  }, [])

  const filteredRows = useMemo(() => {
    return rows.filter((row) => {
      return (
        row.name.toLowerCase().includes(filter) ||
        row.email.toLowerCase().includes(filter)
      )
    })
  }, [rows, filter])

  const sortedRows = useMemo(() => {
    return [...filteredRows].sort((a, b) => {
      const valueA = (a as any)[orderBy]
      const valueB = (b as any)[orderBy]

      if (valueA < valueB) {
        if (order === 'asc') {
          return -1
        }
        if (order === 'desc') {
          return 1
        }
      }

      if (valueA > valueB) {
        if (order === 'asc') {
          return 1
        }
        if (order === 'desc') {
          return -1
        }
      }

      return 0
    })
  }, [filteredRows, orderBy, order])

  return (
    <div>
      <Header onFilter={handleFilter} />
      <Table
        rows={sortedRows}
        onSort={handleSort}
        order={order}
        orderBy={orderBy}
      />
    </div>
  )
}

export default App
