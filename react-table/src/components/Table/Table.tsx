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

const filterRows = (rows: Row[], searchText: string) => {
  const lowerSearchText = searchText.toLowerCase();
  return rows.filter(({ name, email }) => {
    return (
      name.toLowerCase().includes(lowerSearchText) ||
      email.toLowerCase().includes(lowerSearchText)
    );
  });
};

const orderList = (rowList :Row[], orderBy :string, orderType : 'asc' | 'desc') => {
  if(orderBy === 'name' || orderBy === 'email'){
    return rowList.sort((a,b) => 
      orderType === 'asc' ?
      a[orderBy].toLowerCase().localeCompare(b[orderBy].toLowerCase()) :
      b[orderBy].toLowerCase().localeCompare(a[orderBy].toLowerCase())
    );
  }
  if(orderBy === 'age'){
    return rowList.sort((a,b) => 
      orderType === 'asc' ? a.age - b.age : b.age - a.age
    );
  }
  return rowList;
}

const Table = ({ rows, searchText }: { rows: Row[], searchText: string }) => {
  const [orderBy, setOrderBy] = useState('');
  const [orderType, setOrderType] = useState<'asc' | 'desc'>('asc');
  const [selected, setSelected] = useState<string[]>([]);
  
  const rowList = useMemo(() => {
    const filter = filterRows(rows, searchText);
    return orderList(filter, orderBy, orderType);
  }, [rows, orderBy, orderType, searchText]);
  
  const handleRequestSort = (event: MouseEvent, property: string) => {
    console.log('property?', property)
    setOrderBy(property);
    setOrderType(orderType === 'asc' ? 'desc' : 'asc') 
  }

  const handleSelectAllClick = (event: MouseEvent) => {
    if ((event.target as HTMLInputElement).checked) {
      const newSelecteds = rowList.map((row) => row.name);
      setSelected(newSelecteds);
    } else {
      setSelected([]);
    }
  };

  const handleClick = (event: MouseEvent, name: string) => {
    console.log('event', event, 'name', name)
    const selectedIndex = selected.indexOf(name);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = [...selected, name];
    } else if (selectedIndex === 0) {
      newSelected = selected.slice(1);
    } else if (selectedIndex === selected.length - 1) {
      newSelected = selected.slice(0, -1);
    } else if (selectedIndex > 0) {
      newSelected = [
        ...selected.slice(0, selectedIndex),
        ...selected.slice(selectedIndex + 1),
      ];
    }
    setSelected(newSelected);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableToolbar numSelected={0} />

        <TableContainer>
          <MuiTable>
            <TableHead
              numSelected={0}
              order={orderType}
              orderBy={orderBy}
              onSelectAllClick={(event: MouseEvent) =>
                handleSelectAllClick(event)
              }
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {rowList.map((row) => {
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
                      <Checkbox
                       color="primary"/> 
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
