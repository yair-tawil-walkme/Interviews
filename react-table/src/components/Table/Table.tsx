import { MouseEvent, memo, useCallback, useMemo, useState } from 'react'
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

const Table = memo(
  ({ rows, searchQuery }: { rows: Row[]; searchQuery: string }) => {
    const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('asc')
    const [sortByField, setSortByField] = useState<keyof Row>('name')
    const filterableFields: (keyof Row)[] = useMemo(() => ['name', 'email'], [])

    const handleRequestSort = (event: MouseEvent, property: string) => {
      if (sortByField === property) {
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
      } else {
        setSortByField(property as keyof Row)
      }
    }

    const handleSelectAllClick = () => {}

    const handleClick = (event: MouseEvent, name: string) => {
      console.log('event', event, 'name', name)
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const isSelected = (name: string) => false

    const stringifyRow = useCallback(
      (row: Row): string =>
        filterableFields.map((fieldName) => row[fieldName]).join(' '),
      [filterableFields]
    )

    const filterBySearchQuery = useCallback(
      (row: Row): boolean => {
        const words = searchQuery.toLowerCase().split(' ')
        const stringifiedRow = stringifyRow(row).toLowerCase()

        // eslint-disable-next-line no-restricted-syntax
        for (const word of words) {
          if (!stringifiedRow.includes(word)) return false
        }

        return true
      },
      [searchQuery, stringifyRow]
    )

    const sortBySelectedField = useCallback(
      (a: Row, b: Row) => {
        const aFieldValue = a[sortByField].toString().toLowerCase()
        const bFieldValue = b[sortByField].toString().toLowerCase()

        const sortValueByAscOrder = aFieldValue.localeCompare(bFieldValue)

        return sortValueByAscOrder * (sortOrder === 'desc' ? -1 : 1)
      },
      [sortOrder, sortByField]
    )

    return (
      <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
          <TableToolbar numSelected={0} />

          <TableContainer>
            <MuiTable>
              <TableHead
                numSelected={0}
                order={sortOrder}
                orderBy={sortByField}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
              />
              <TableBody>
                {rows
                  .filter(filterBySearchQuery)
                  .sort(sortBySelectedField)
                  .map((row) => {
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
)

export default Table
