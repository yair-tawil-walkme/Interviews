import { MouseEvent, useState, useCallback } from 'react'
/* eslint-disable-next-line import/no-extraneous-dependencies */
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import MuiTable from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Checkbox from '@mui/material/Checkbox'
import TableHead from './TableHead'
import TableToolbar from './TableToolbar'
import { Row } from '../../db/model'
import { useTableState } from './useTableState'
import { highlightMatch } from '../../utils/highlightMatch'
import { cells } from './cells'
import { COLUMN_ID_NAME, COLUMN_ID_EMAIL } from '../../constants'
import './Table.scss'

const initialVisibleColumns: Record<string, boolean> = Object.fromEntries(
  cells.map((cell) => [cell.id, true])
)

const Table = ({
  rows,
  setRows,
  searchQuery,
}: {
  rows: Row[]
  setRows: React.Dispatch<React.SetStateAction<Row[]>>
  searchQuery: string
}) => {
  const { t } = useTranslation()
  const [visibleColumns, setVisibleColumns] = useState<Record<string, boolean>>(
    () => ({ ...initialVisibleColumns })
  )

  const toggleColumnVisibility = useCallback((columnId: string) => {
    setVisibleColumns((prev) => {
      const next = { ...prev, [columnId]: !prev[columnId] }
      const visibleCount = Object.values(next).filter(Boolean).length
      if (visibleCount === 0) return prev
      return next
    })
  }, [])

  const {
    sortedRows,
    order,
    orderBy,
    handleRequestSort,
    selectedIds,
    toggleSelection,
    handleSelectAllClick,
    allSelected,
    someSelected,
    isSelected,
    handleDelete,
  } = useTableState(rows, setRows, searchQuery)

  const query = searchQuery.trim().toLowerCase()
  const visibleCells = cells.filter((cell) => visibleColumns[cell.id])
  const columnCount = 1 + visibleCells.length

  return (
    <Box className="tableWrapper">
      <Paper className="tablePaper">
        <TableToolbar
          numSelected={selectedIds.size}
          onDelete={handleDelete}
          visibleColumns={visibleColumns}
          onToggleColumnVisibility={toggleColumnVisibility}
        />

        <div
          className="tableContainer"
          role="region"
          aria-label={t('tableTitle')}
        >
          <MuiTable stickyHeader size="small" className="table">
            <TableHead
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={sortedRows.length}
              allSelected={allSelected}
              someSelected={someSelected}
              visibleColumns={visibleColumns}
            />
            <TableBody>
              {sortedRows.length === 0 && query ? (
                <TableRow>
                  <TableCell
                    colSpan={columnCount}
                    align="center"
                    className="tableEmptyMessage"
                  >
                    {t('emptySearchMessage')}
                  </TableCell>
                </TableRow>
              ) : null}
              {sortedRows.map((row) => {
                const isItemSelected = isSelected(row.id)

                return (
                  <TableRow
                    hover
                    onClick={(event: MouseEvent) => {
                      event.stopPropagation()
                      toggleSelection(row.id)
                    }}
                    role="checkbox"
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                    className="tableRow"
                  >
                    <TableCell
                      padding="checkbox"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        onChange={() => toggleSelection(row.id)}
                      />
                    </TableCell>
                    {visibleCells.map((cell) => {
                      const className =
                        cell.id === COLUMN_ID_NAME
                          ? 'tableCellName'
                          : cell.id === COLUMN_ID_EMAIL
                          ? 'tableCellEmail'
                          : 'tableCellAge'
                      const value =
                        cell.id === COLUMN_ID_NAME
                          ? row.name
                          : cell.id === COLUMN_ID_EMAIL
                          ? row.email
                          : String(row.age)
                      const displayValue =
                        query && typeof value === 'string'
                          ? highlightMatch(value, query)
                          : value

                      return (
                        <TableCell
                          key={cell.id}
                          component={
                            cell.id === COLUMN_ID_NAME ? 'th' : undefined
                          }
                          scope={cell.id === COLUMN_ID_NAME ? 'row' : undefined}
                          padding={cell.disablePadding ? 'none' : 'normal'}
                          align={cell.numeric ? 'right' : 'left'}
                          className={className}
                        >
                          {displayValue}
                        </TableCell>
                      )
                    })}
                  </TableRow>
                )
              })}
            </TableBody>
          </MuiTable>
        </div>
      </Paper>
    </Box>
  )
}

export default Table
