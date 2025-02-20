import { MouseEvent, useEffect, useState } from 'react'
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

const Table = ({ rows, input }: { rows: Row[], input: string }) => {
  const [filterRow, setFilterRow] = useState<Row[]>(rows);
  const [nameUp, setNameUp] = useState<boolean>(true);
  const [emailUp, setEmailUp] = useState<boolean>(true);
  const [ageUp, setAgeUp] = useState<boolean>(true);

  useEffect(() => {
    if (input !== '') {
      setFilterRow(rows.filter((row) => row.name.toLowerCase().includes(input.toLowerCase()) || row.email.toLowerCase().includes(input.toLowerCase())));
    } else {
      setFilterRow(rows);
    }
  }, [input]);

  const sortRows = (sortKey: 'name' | 'email' | 'age', sortDir: boolean) => {
    setFilterRow(filterRow.sort((rowA, rowB) => {
      if (rowA[sortKey] > rowB[sortKey]) {
        return sortDir ? - 1 : 1;
      }
      return sortDir ? 1 : - 1;
    }));
    switch (sortKey) {
      case "name":
        setNameUp(!sortDir);
        break;
      case 'email':
        setEmailUp(!sortDir);
        break;
      case 'age':
        setAgeUp(!sortDir);
        break;
      default:
        break;
    }
  }

  const handleRequestSort = (event: MouseEvent, property: string) => {
    console.log('property?', property)
    if (property === 'name') {
        sortRows(property, nameUp);
    } else if (property === 'email') {
      sortRows(property, emailUp);
    } else if(property === 'age') {
      sortRows(property, ageUp);
    }
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
              // order={order}
              // orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={filterRow.length}
            />
            <TableBody>
              {filterRow.map((row) => {
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
