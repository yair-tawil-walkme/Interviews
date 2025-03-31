import { MouseEvent, useCallback, useEffect, useMemo, useState } from 'react'
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

const Table = ({ rows,searchInput,onDelete}: { rows: Row[],searchInput: string,onDelete:(selected:string[])=>void }) => {
  const [orderBy,setOrderBy]=useState('name')
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [selected, setSelected] = useState<string[]>([]);

  const filteredRows=useMemo(()=>{
    return rows.filter(({name,email})=>
      name.toLowerCase().includes(searchInput) ||
      email.toLowerCase().includes(searchInput))
  },[rows, searchInput])

  const displayedRows=useMemo(() => {
      return [...filteredRows].sort((row1, row2) => {
        const key = orderBy as keyof Row; // Ensure orderBy is a valid key
        const value1 = row1[key];
        const value2 = row2[key];
  
        if (typeof value1 === 'number' && typeof value2 === 'number') {
          return order === 'asc' ? value1 - value2 : value2 - value1;
        } 
        if (typeof value1 === 'string' && typeof value2 === 'string') {
          return order === 'asc' ? value1.localeCompare(value2) : value2.localeCompare(value1);
        }
        return 0;
      })
  }, [filteredRows, order, orderBy])
  
  const selectAll=useMemo(()=>{
    if(displayedRows.length===selected.length && displayedRows.length>0){
      return true
    }
    return false
  },[selected])
  
  const handleRequestSort = (event: MouseEvent, property: string) => {
    setOrderBy(property)
    setOrder((prevOrder)=>prevOrder==='asc'?'desc':'asc')
  }

  const handleSelectAllClick = () => {
    setSelected(prevSelected =>
      displayedRows.length !== prevSelected.length
        ? displayedRows.map(item => item.name)
        : []
    );
  }

  const handleClick = (event: MouseEvent, name: string) => {
    setSelected(prev=>
      prev.includes(name)?prev.filter((item)=>item!==name):[...prev,name]
    )
  }

  const onClickDelete = () => {
    onDelete(selected)
    setSelected([])
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const isSelected = (name: string) => selected.includes(name);



  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableToolbar numSelected={selected.length} onClickDelete={onClickDelete}/>
        <TableContainer>
          <MuiTable>
            <TableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={displayedRows.length}
              selectAll={selectAll}
            />
            <TableBody>
              {displayedRows.map((row) => {
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
                      <Checkbox checked={isItemSelected} color="primary" />
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
