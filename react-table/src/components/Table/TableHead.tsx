import { MouseEventHandler, MouseEvent } from 'react'
import MuiTableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import Checkbox from '@mui/material/Checkbox'
import TableSortLabel from '@mui/material/TableSortLabel'
import Box from '@mui/material/Box'
import { visuallyHidden } from '@mui/utils'
import { cells } from './cells'
import { Row } from '../../db/model'

const TableHead = ({
  order = 'asc',
  orderBy = 'name',
  onRequestSort,
  onSelectAllClick,
  rowCount,
  numSelected,
}: {
  order?: 'asc' | 'desc'
  orderBy?: keyof Row
  onRequestSort: (event: MouseEvent, property: keyof Row) => void
  rowCount: number
  numSelected: number
  onSelectAllClick: () => void
}) => {
  const createSortHandler =
    (property: keyof Row): MouseEventHandler<HTMLButtonElement> =>
    (event) => {
      onRequestSort(event, property)
    }

  return (
    <MuiTableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onClick={onSelectAllClick}
          />
        </TableCell>

        {cells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </MuiTableHead>
  )
}

export default TableHead
