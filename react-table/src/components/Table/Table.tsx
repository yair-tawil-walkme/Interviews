/* eslint-disable prettier/prettier */
import { ChangeEvent, MouseEvent, useState } from 'react';
import Box from '@mui/material/Box';
import MuiTable from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import TableHead from './TableHead';
import TableToolbar from './TableToolbar';
import { Row } from '../../db/model';

const Table = ({
   rows,
   searchQuery 
  }: {
   rows: Row[],
   searchQuery: string }) => {
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [orderBy, setOrderBy] = useState<string>('');
  const [selected,setSelected] = useState<readonly number[]>([])
  const [tableRows,setTableRows] = useState<Row[]>(rows)

  const handleRequestSort = (event: MouseEvent, property: string) => {
    const isAscending = orderBy === property && order === 'asc'
    setOrder(isAscending ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const filteredRows = tableRows.filter(
    (row) =>
      row.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.email.toLowerCase().includes(searchQuery.toLowerCase())
  )
  const handleSelectAllClick = (event: ChangeEvent<HTMLInputElement>) => {
    if(event.target.checked){
      const newSelected = tableRows.map((row)=>row.id)
      setSelected(newSelected)
      return
    }
    setSelected([])
  }

  const handleClick = (event: MouseEvent, id: number) => {
    const selectedIndex = selected.indexOf(id)
    let newSelected: readonly number[] = []
    if(selectedIndex === -1){
      newSelected = newSelected.concat(selected,id);
    } else if(selectedIndex === 0){
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const isSelected = (id: number) => selected.includes(id)

  const sortedRows = [...filteredRows].sort((a,b)=>{
    if(!orderBy) return 0
    if(order === 'asc'){
      return a[orderBy as keyof Row] > b[orderBy as keyof Row] ? 1 : -1
    }
    return a[orderBy as keyof Row] < b[orderBy as keyof Row] ? 1 : -1
  })

  const handleDelete = ()=>{
    const remainingRows = tableRows.filter((row)=>!selected.includes(row.id))
    setTableRows(remainingRows)
    setSelected([])
  }
  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableToolbar numSelected={selected.length} onDelete={handleDelete} />
        <TableContainer>
          <MuiTable
           sx={{minWidth: 750}}
           size='small'
           >
            <TableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {sortedRows.map((row) => {
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
                    aria-checked={isItemSelected}
                    sx={{cursor: 'pointer' }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox 
                        color="primary"
                        checked={isItemSelected}
                         />
                    </TableCell>
                    <TableCell component="th" scope="row" padding="none">
                      {row.name}
                    </TableCell>
                    <TableCell align="left">{row.email}</TableCell>
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
