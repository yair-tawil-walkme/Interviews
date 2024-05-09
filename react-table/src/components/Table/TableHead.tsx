import { MouseEventHandler, MouseEvent } from 'react'
import MuiTableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import Checkbox from '@mui/material/Checkbox'
import TableSortLabel from '@mui/material/TableSortLabel'
import Box from '@mui/material/Box'
import { visuallyHidden } from '@mui/utils'

import { cells } from './cells'
import { ColumnsType } from '../../db/model'

const TableHead = ({
  order = 'asc',
  orderBy = 'name',
  onRequestSort,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onSelectAllClick,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  rowCount,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  numSelected,
}: {
  order?: 'asc' | 'desc'
  orderBy?: string
  onRequestSort: (event: MouseEvent, property: ColumnsType, order: undefined | 'asc' | 'desc') => void
  rowCount: number
  numSelected: number
  onSelectAllClick: (e: React.ChangeEvent<HTMLInputElement>) => void
}) => {
  const createSortHandler =
    (property: ColumnsType, order: undefined | 'asc' | 'desc'): MouseEventHandler<HTMLButtonElement> =>
      (event) => {
        onRequestSort(event, property, order)
      }

  const isSomeRowsClicked = (numSelected > 0 && numSelected < rowCount)

  return (
    <MuiTableHead>
      <TableRow>
        <TableCell padding="checkbox" >
          <Checkbox color="primary" onChange={onSelectAllClick} indeterminate={isSomeRowsClicked} />
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
              direction={order}
              onClick={createSortHandler(headCell.id as ColumnsType, order)}
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
