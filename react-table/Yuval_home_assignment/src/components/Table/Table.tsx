import { MouseEvent, useState } from 'react'
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

const Table = ({ rows, searchQuery }: { rows: Row[], searchQuery: string }) => {
  const [order, setOrder] = useState<'asc' | 'desc'>('asc')
  const [orderBy, setOrderBy] = useState('name')

  const handleRequestSort = (event: MouseEvent, property: string) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const sortedRows = [...rows].sort((a, b) => {
    const key = orderBy as keyof Row
    const valueA = a[key]
    const valueB = b[key]
    if (typeof valueA === 'number' && typeof valueB === 'number') {
      return order === 'asc' ? valueA - valueB : valueB - valueA
    }
  
    if (typeof valueA === 'string' && typeof valueB === 'string') {
      return order === 'asc'
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA)
    }
  
    return 0
  })

  const filteredRows = sortedRows.filter(row =>
    row.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    row.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleClick = (event: MouseEvent, name: string) => {
    console.log('event', event, 'name', name)
  }

  const handleSelectAllClick = () => {}



  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableToolbar numSelected={0} />

        <TableContainer>
          <MuiTable>
            <TableHead
              numSelected={0}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {filteredRows.map((row) => {
                return (
                  <TableRow
                    hover
                    onClick={(event: MouseEvent) =>
                      handleClick(event, row.name)
                    }
                    role="checkbox"
                    tabIndex={-1}
                    key={row.name}
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