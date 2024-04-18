import {Dispatch, MouseEvent, SetStateAction, useCallback, useRef, useState} from 'react'
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

const Table = ({ rows, setRows, search }: { rows: Row[], setRows: Dispatch<SetStateAction<Row[]>>, search: string }) => {
  const [checkedRows, setCheckedRows] = useState<any>(rows.reduce((m,row) => ({ ...m, [row.name]: false}), {}));
  const numSelectedRef = useRef(0)
  const [isAllChecked, setIsAllChecked] = useState<boolean>(false)
  const [orderBy, setOrderBy] = useState('');
  const [isAscending, setIsAscending] = useState<boolean>();

  const handleRequestSort = (event: MouseEvent, property: string) => {
    setOrderBy(property)
    setIsAscending(!isAscending);
  }

  const filterBySearch = (row: Row) => {
    return (
        row.name.toLowerCase().includes(search.toLowerCase()) ||
        row.email.toLowerCase().includes(search.toLowerCase())
    )
  };

  const orderByColumn = useCallback((row1: Row, row2: Row) => {
    if (orderBy && isAscending !== undefined) {
      // @ts-ignore
      const result = row1[orderBy] < row2[orderBy] ? -1 : 1;
      return isAscending ? result : result * -1;
    }
    return 0
  }, [orderBy, isAscending])

  const handleSelectAllClick = () => {
    setIsAllChecked(!isAllChecked);
    numSelectedRef.current = isAllChecked? 0 : rows.length;
  }

  const handleClick = (event: MouseEvent, name: string) => {
    const checkbox = event.target as HTMLInputElement;
    const isChecked = checkbox.checked;
    numSelectedRef.current += isChecked? 1 : - 1;
    setCheckedRows({...checkedRows, [name]: isChecked });
  }

  const isSelected = (name: string) => checkedRows[name] === true;

  const deleteItemsHandler = () => {
    setRows(rows.filter((row) => checkedRows[row.name] !== true));
    numSelectedRef.current = 0;
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableToolbar deleteItemsHandler={deleteItemsHandler} numSelected={numSelectedRef.current} />

        <TableContainer>
          <MuiTable>
            <TableHead
              numSelected={numSelectedRef.current}
              order={isAscending? 'asc' : 'desc'}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {rows.filter(filterBySearch).sort(orderByColumn).map((row) => {
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
                      <Checkbox color="primary" checked={isItemSelected || isAllChecked} />
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
