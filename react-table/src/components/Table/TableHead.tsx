import { MouseEventHandler, MouseEvent } from 'react'
/* eslint-disable-next-line import/no-extraneous-dependencies */
import { useTranslation } from 'react-i18next'
import MuiTableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import Checkbox from '@mui/material/Checkbox'
import TableSortLabel from '@mui/material/TableSortLabel'
import Box from '@mui/material/Box'
import { visuallyHidden } from '@mui/utils'
import {
  SORT_ASC,
  DEFAULT_ORDER_BY,
  COLUMN_ID_NAME,
  COLUMN_ID_EMAIL,
} from '../../constants'
import { cells } from './cells'
import './Table.scss'

const TableHead = ({
  order = SORT_ASC,
  orderBy = DEFAULT_ORDER_BY,
  onRequestSort,
  onSelectAllClick,
  rowCount,
  allSelected,
  someSelected,
  visibleColumns,
}: {
  order?: 'asc' | 'desc'
  orderBy?: string
  onRequestSort: (event: MouseEvent, property: string) => void
  rowCount: number
  onSelectAllClick: () => void
  allSelected: boolean
  someSelected: boolean
  visibleColumns: Record<string, boolean>
}) => {
  const { t } = useTranslation()
  const createSortHandler =
    (property: string): MouseEventHandler<HTMLButtonElement> =>
    (event) => {
      onRequestSort(event, property)
    }

  const visibleHeadCells = cells.filter((cell) => visibleColumns[cell.id])

  return (
    <MuiTableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={someSelected && !allSelected}
            checked={rowCount > 0 ? allSelected : false}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': t('ariaLabelSelectAll') }}
          />
        </TableCell>

        {visibleHeadCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
            className={
              headCell.id === COLUMN_ID_NAME
                ? 'tableCellName'
                : headCell.id === COLUMN_ID_EMAIL
                ? 'tableCellEmail'
                : 'tableCellAge'
            }
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : SORT_ASC}
              onClick={createSortHandler(headCell.id)}
            >
              {t(headCell.labelKey)}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc'
                    ? t('sortedDescending')
                    : t('sortedAscending')}
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
