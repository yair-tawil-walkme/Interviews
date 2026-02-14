import { MouseEvent, useMemo, useState } from 'react'
import Box from '@mui/material/Box'
import MuiTable from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Checkbox from '@mui/material/Checkbox'
import TableHead from './TableHead'
import TableToolbar from './TableToolbar'
import { Row } from '../../db/model'

type Order = 'asc' | 'desc'

const descendingComparator = <T,>(a: T, b: T, orderBy: keyof T) => {
  const aValue = a[orderBy]
  const bValue = b[orderBy]

  if (typeof aValue === 'number' && typeof bValue === 'number') {
    return bValue - aValue
  }

  return String(bValue).localeCompare(String(aValue), undefined, {
    sensitivity: 'base',
    numeric: true,
  })
}

const getComparator = <Key extends keyof Row>(order: Order, orderBy: Key) => {
  return order === 'desc'
    ? (a: Row, b: Row) => descendingComparator(a, b, orderBy)
    : (a: Row, b: Row) => -descendingComparator(a, b, orderBy)
}

const stableSort = (array: Row[], comparator: (a: Row, b: Row) => number) => {
  const stabilized = array.map((el, index) => [el, index] as const)
  stabilized.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) return order
    return a[1] - b[1]
  })
  return stabilized.map((el) => el[0])
}

const Table = ({
  rows,
  onDeleteRows,
}: {
  rows: Row[]
  onDeleteRows: (idsToDelete: number[]) => void
}) => {
  const [order, setOrder] = useState<Order>('asc')
  const [orderBy, setOrderBy] = useState<keyof Row>('name')
  const [selectedIds, setSelectedIds] = useState<number[]>([])

  const visibleRows = useMemo(() => {
    return stableSort(rows, getComparator(order, orderBy))
  }, [rows, order, orderBy])

  const handleRequestSort = (_event: MouseEvent, property: keyof Row) => {
    const isSameColumn = orderBy === property
    const nextOrder: Order = isSameColumn && order === 'asc' ? 'desc' : 'asc'
    setOrder(nextOrder)
    setOrderBy(property)
  }

  const handleSelectAllClick = () => {
    if (visibleRows.length === 0) return
    const visibleIds = visibleRows.map((r) => r.id)
    const allVisibleSelected = visibleIds.every((id) =>
      selectedIds.includes(id)
    )

    if (allVisibleSelected) {
      setSelectedIds((prev) => prev.filter((id) => !visibleIds.includes(id)))
      return
    }

    setSelectedIds((prev) => Array.from(new Set([...prev, ...visibleIds])))
  }

  const handleRowCheckboxClick = (event: MouseEvent, id: number) => {
    event.stopPropagation()
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }

  const handleDeleteSelected = () => {
    if (selectedIds.length === 0) return
    const idsToDelete = selectedIds
    onDeleteRows(idsToDelete)
    setSelectedIds([])
  }

  const numSelectedVisible = visibleRows.filter((r) =>
    selectedIds.includes(r.id)
  ).length

  const isSelected = (id: number) => selectedIds.includes(id)

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableToolbar
          numSelected={selectedIds.length}
          onDeleteSelected={handleDeleteSelected}
        />

        <TableContainer>
          <MuiTable>
            <TableHead
              numSelected={numSelectedVisible}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {visibleRows.map((row) => {
                const isItemSelected = isSelected(row.id)

                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        onClick={(event) =>
                          handleRowCheckboxClick(event, row.id)
                        }
                      />
                    </TableCell>
                    <TableCell component="th" scope="row" padding="none">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.email}</TableCell>
                    <TableCell align="right">{row.age}</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </MuiTable>
        </TableContainer>
      </Paper>
    </Box>
  )
}

export default Table
