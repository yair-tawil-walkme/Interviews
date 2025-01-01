import { MouseEvent, SetStateAction } from 'react'
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
import { Sort } from '../App'

const Table = ({
  rows,
  toggleSort,
  setSelectedRows,
  sortType,
}: {
  rows: Row[]
  toggleSort: () => void
  setSelectedRows: React.Dispatch<SetStateAction<number[]>>
  sortType: Sort
}) => {
  const handleRequestSort = () => {
    toggleSort()
  }

  const handleSelectAllClick = () => {}

  const handleClick = (event: MouseEvent, id: number) => {
    setSelectedRows((prev) => [...prev, id])
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const isSelected = (name: string) => false

  return (
    <Box sx={{ width: '100%', margin: 5 }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableToolbar numSelected={0} />

        <TableContainer>
          <MuiTable>
            <TableHead
              numSelected={0}
              order={sortType === 'no-sort' ? 'asc' : sortType}
              // orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {rows.map((row) => {
                const isItemSelected = isSelected(row.name)

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
