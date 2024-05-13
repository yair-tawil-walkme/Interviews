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

import { Row, ColumnsType } from '../../db/model'
import FilterTypes from '../../types/filterObject'
import { getNewOrder, useSelectedRows, useTableFilterData } from '../../utils/row'

const Table = ({ rows }: { rows: Row[] }) => {
  const [tableFilterData, setTableFilterData] = useTableFilterData()
  const [selectedRows, setSelectedRows] = useSelectedRows()

  const handleRequestSort = (event: MouseEvent, property: ColumnsType, order: undefined | 'asc' | 'desc') => {
    setTableFilterData((prev: FilterTypes) => ({
      ...prev,
      sort: {
        order: property !== prev.sort.orderBy ? 'asc' : getNewOrder(order),
        orderBy: property
      }
    })
    )
  }

  const handleSelectAllClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = e
    if (target.checked) {
      const newSelected = rows.map((n) => n.id)
      setSelectedRows(newSelected)
      return
    }
    setSelectedRows([])
  }

  const handleClick = (event: MouseEvent, id: number) => {
    setSelectedRows((prev: number[]) => {
      if (!prev.includes(id)) return [...prev, id]

      const indexOfId = prev.indexOf(id)
      const clonedArray = [...prev]
      clonedArray.splice(indexOfId, 1)
      return clonedArray
    })
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const isSelected = (id: number) => selectedRows.indexOf(id) !== -1

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableToolbar numSelected={selectedRows.length} rowsLength={rows.length}/>

        <TableContainer>
          <MuiTable>
            <TableHead
              numSelected={selectedRows.length}
              order={tableFilterData.sort.order}
              orderBy={tableFilterData.sort.orderBy}
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
                    onClick={(event: MouseEvent) =>
                      handleClick(event, row.id)
                    }
                    role="checkbox"
                    tabIndex={-1}
                    key={row.name}
                    selected={isItemSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox color="primary" checked={isItemSelected} />
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
