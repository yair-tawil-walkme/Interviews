import * as React from 'react'
import { alpha } from '@mui/material/styles'
import Box from '@mui/material/Box'
import MuiTable from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import MuiTableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableSortLabel from '@mui/material/TableSortLabel'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import DeleteIcon from '@mui/icons-material/Delete'
import FilterListIcon from '@mui/icons-material/FilterList'
import { visuallyHidden } from '@mui/utils'
import { useState } from 'react';

const headCells = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Name',
  },
  {
    id: 'email',
    numeric: true,
    disablePadding: false,
    label: 'Email',
  },
  {
    id: 'age',
    numeric: true,
    disablePadding: false,
    label: 'Age',
  },
]

function TableHead(props) {
  const { order = 'asc', orderBy = 'name', onRequestSort } = props

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property)
  }

  return (
    <MuiTableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox color="primary" />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </MuiTableHead>
  )
}

function TableToolbar(props) {
  const { numSelected } = props

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity,
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Users
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  )
}

export default function Table({ rows, setTableRows }) {

  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');

  const handleRequestSort = (event, property) => {
    setOrderBy(property)

    if (order === 'asc') {
      setOrder('desc')
    } else {
      setOrder('asc')
    }
      const sortedRows = [...rows].sort((a,b) => {
        const nameA = a[property].toLowerCase()
        const nameB = b[property].toLowerCase();
        if (nameA < nameB) {
          return order === 'asc' ?  -1 :  1
        }
        if (nameA > nameB) {
          return order === 'asc' ? 1 : -1
        }
        return 0
      });

      setTableRows(sortedRows);
  }

  const handleSelectAllClick = (event) => {
  }

  const handleClick = (event, name) => {
  }

  const isSelected = (name) => {
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableToolbar numSelected={0} />

        <TableContainer>
          <MuiTable>
            <TableHead
              numSelected={0}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {rows.map((row) => {
                const isItemSelected = isSelected(row.name)

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.name)}
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
