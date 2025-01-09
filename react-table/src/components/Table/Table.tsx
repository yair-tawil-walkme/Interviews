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
import { useAtomValue } from 'jotai'
import { searchAtom } from '../atom'

const Table = ({ rows }: { rows: Row[] }) => {
  const [order, setOrder] = useState<'asc' | 'desc'>('asc')
  const [orderBy, setOrderBy] = useState<string>('')

  const search = useAtomValue(searchAtom)

  const showRows =
    search === ''
      ? rows
      : rows.filter(
          (row) =>
            row.name.toLowerCase().includes(search.toLowerCase()) ||
            row.email.toLowerCase().includes(search.toLowerCase()) ||
            row.age.toString().includes(search)
        )

  const sortedRows = [...showRows].sort((a, b) => {
    if (orderBy) {
      const aValue = a[orderBy as keyof Row]
      const bValue = b[orderBy as keyof Row]

      if (aValue < bValue) return order === 'asc' ? -1 : 1
      if (aValue > bValue) return order === 'asc' ? 1 : -1
    }
    return 0
  })

  const handleRequestSort = (event: MouseEvent, property: string) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleSelectAllClick = () => {}

  const handleClick = (event: MouseEvent, name: string) => {
    console.log('event', event, 'name', name)
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const isSelected = (name: string) => false

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
              rowCount={showRows.length}
            />
            <TableBody>
              {sortedRows.map((row) => {
                const isItemSelected = isSelected(row.name)

                return (
                  <TableRow
                    hover
                    onClick={(event: MouseEvent) =>
                      handleClick(event, row.name)
                    }
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
