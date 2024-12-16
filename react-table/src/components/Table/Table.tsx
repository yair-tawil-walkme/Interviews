import { useState, MouseEvent } from 'react'
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

interface TableProps {
  rows: Row[]
  searchQuery: string
}

const Table: React.FC<TableProps> = ({ rows, searchQuery }) => {
  const [orderBy, setOrderBy] = useState<string | undefined>(undefined)
  const [order, setOrder] = useState<'asc' | 'desc'>('asc')
  const [selectedRows, setSelectedRows] = useState<string[]>([])
  const [rowsState, setRowsState] = useState<Row[]>(rows)

  const handleRequestSort = (event: MouseEvent, property: string) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleSelectAllClick = () => {}

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    const selectedIndex = selectedRows.indexOf(id)
    let newSelected: string[] = []

    if (event.target.checked) {
      newSelected = newSelected.concat(selectedRows, id)
    } else {
      newSelected = newSelected.concat(
        selectedRows.slice(0, selectedIndex),
        selectedRows.slice(selectedIndex + 1)
      ) // Remove id if unchecked
    }

    setSelectedRows(newSelected)
  }

  const isSelected = (id: string | number) =>
    selectedRows.indexOf(String(id)) !== -1

  // Filter rows based on searchQuery
  const filteredRows = rowsState.filter((row) => {
    return (
      row.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.email.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })

  // Sort rows based on column and order
  const sortedRows = filteredRows.sort((a, b) => {
    if (!orderBy) return 0
    const valueA = a[orderBy as keyof Row]
    const valueB = b[orderBy as keyof Row]
    if (valueA < valueB) return order === 'asc' ? -1 : 1
    if (valueA > valueB) return order === 'asc' ? 1 : -1
    return 0
  })

  // Handle deletion of selected rows
  const handleDeleteRows = () => {
    const remainingRows = rowsState.filter(
      (row) => !selectedRows.includes(String(row.id))
    )
    setRowsState(remainingRows)
    setSelectedRows([])
    console.log('Remaining rows after deletion:', remainingRows)
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableToolbar
          numSelected={selectedRows.length}
          handleDeleteRows={handleDeleteRows}
        />
        <TableContainer>
          <MuiTable>
            <TableHead
              numSelected={selectedRows.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={filteredRows.length}
            />
            <TableBody>
              {sortedRows.map((row) => {
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
                        onChange={(
                          event: React.ChangeEvent<HTMLInputElement>
                        ) => handleCheckboxChange(event, String(row.id))}
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
