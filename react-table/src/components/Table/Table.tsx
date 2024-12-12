import { MouseEvent, useMemo, useState } from 'react'
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

const Table = ({ rows }: { rows: Row[] }) => {
  const [sortField,setSortField] = useState('');
  const [sortOrder,setSortOrder] = useState<'asc' | 'desc'>('asc');

  const handleRequestSort = (event: MouseEvent, property: string) => {
    setSortOrder((prevOrder) =>(
      (sortField === property && prevOrder === 'asc' ? 'desc' : 'asc')
    ))
    setSortField(property);
    console.log('property?', property)
  }

  const getSortData =(data : Row[] , field : string, order : 'asc' | 'desc'): Row[] => {
    console.log(field)
    return [...data].sort((a,b) => {
      const valueA = a[field as keyof Row];
      const valueB = b[field as keyof Row];

      if(typeof valueA === 'string' && typeof valueB === 'string'){
        return order === 'asc' ?
          valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      }

      if(typeof valueA === 'number' && typeof valueB === 'number'){
        return order === 'asc' ?
        valueA - valueB
        : valueB - valueA;
      }

      // if the values can't be compared
      return 0; 
    });
  }

  const sortedData = useMemo(() => getSortData(rows, sortField, sortOrder), [rows, sortField, sortOrder])
  
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
              order={sortOrder}
              orderBy={sortField}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {sortedData.map((row) => {
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
