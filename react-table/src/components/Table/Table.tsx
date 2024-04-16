import { MouseEvent, useCallback, useState } from 'react'
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

interface isAscSort {
  name: boolean
  email: boolean
  age: boolean
}

const initialState: isAscSort = {
  name: true,
  email: true,
  age: true,
}

const Table = ({
  rows,
  setFilteredRows,
  setRows,
}: {
  rows: Row[]
  setFilteredRows: (newRows: Row[]) => void
  setRows: (newRows: Row[]) => void
}) => {
  const [isAscSortMap, setIsAscSortMap] = useState<isAscSort>(initialState)
  const [orderBy, setOrderBy] = useState<keyof isAscSort>('name')
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set())
  const [numSelected, setNumSelected] = useState<number>(0)

  const handleRequestSort = useCallback(
    (event: MouseEvent, property: string) => {
      const key = property as keyof isAscSort

      const sortedRows = [...rows].sort((a, b) => {
        const multiplier = isAscSortMap[key] ? 1 : -1
        if (a[key] < b[key]) return -1 * multiplier
        if (a[key] > b[key]) return 1 * multiplier
        return 0
      })

      setFilteredRows(sortedRows)
      setOrderBy(key)
      setIsAscSortMap((prev) => ({
        ...prev,
        [key]: !prev[key],
      }))
    },
    [rows]
  )

  const handleSelectAllClick = () => {
    if (numSelected === rows.length) {
      setSelectedRows(new Set())
      setNumSelected(0)
    } else {
      const selectedRowsIds = rows.map((row) => row.id)
      setSelectedRows(new Set(selectedRowsIds))
      setNumSelected(rows.length)
    }
  }

  const handleClick = (event: MouseEvent, id: number) => {
    const target = event.target as HTMLInputElement
    const newSelectedIds = new Set(selectedRows)
    if (target.type === 'checkbox') {
      if (newSelectedIds.has(id)) {
        newSelectedIds.delete(id)
        setNumSelected((prev) => prev - 1)
      } else {
        newSelectedIds.add(id)
        setNumSelected((prev) => prev + 1)
      }
      setSelectedRows(newSelectedIds)
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const isSelected = (id: number) => {
    return selectedRows.has(id)
  }

  const handleDelete = () => {
    const updatedRows = rows.filter((row) => !selectedRows.has(row.id))
    setRows(updatedRows)
    setFilteredRows(updatedRows)
    setSelectedRows(new Set())
    setNumSelected(0)
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableToolbar numSelected={numSelected} handleDelete={handleDelete} />

        <TableContainer>
          <MuiTable>
            <TableHead
              numSelected={numSelected}
              order={isAscSortMap[orderBy] ? 'asc' : 'desc'}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {rows.map((row) => {
                const isItemSelected = isSelected(row.id)

                return (
                  <TableRow
                    hover
                    onClick={(event: MouseEvent) => handleClick(event, row.id)}
                    role="checkbox"
                    tabIndex={-1}
                    key={row.name}
                    selected={isItemSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox color="primary" />
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
