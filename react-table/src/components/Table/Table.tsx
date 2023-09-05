import {MouseEvent, useState} from 'react'
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
import {Row} from '../../db/model'

const Table = ({displayRows, setDisplayRows}:{ displayRows:Row[], setDisplayRows:any }) => {
    const [order, setOrder] = useState<'asc' | 'desc'>('desc');
    const [orderBy, setOrderBy] = useState<string>('name');

    const handleRequestSort = (event:MouseEvent, property:string) => {
        if (property === 'name') {
            if (order === 'desc') {
                setDisplayRows(displayRows.slice().sort((a, b) => a.name.localeCompare(b.name)));
            } else {
                setDisplayRows(displayRows.slice().sort((a, b) => b.name.localeCompare(a.name)));
            }
        } else if (property === 'email') {
            if (order === 'desc') {
                setDisplayRows(displayRows.slice().sort((a, b) => a.email.localeCompare(b.email)));
            } else {
                setDisplayRows(displayRows.slice().sort((a, b) => b.email.localeCompare(a.email)));
            }
        } else if (property === 'age') {
            if (order === 'desc') {
                setDisplayRows(displayRows.slice().sort((a, b) => a.age - b.age));
            } else {
                setDisplayRows(displayRows.slice().sort((a, b) => b.age - a.age));
            }
        }
    }


    const handleSelectAllClick = () => {
    }

    const handleClick = (event:MouseEvent, name:string) => {
        console.log('event', event, 'name', name)
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const isSelected = (name:string) => false

    return (
        <Box sx={{width: '100%'}}>
            <Paper sx={{width: '100%', mb: 2}}>
                <TableToolbar numSelected={0}/>

                <TableContainer>
                    <MuiTable>
                        <TableHead
                            numSelected={0}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={displayRows.length}
                        />
                        <TableBody>
                            {displayRows.map((row) => {
                                const isItemSelected = isSelected(row.name)

                                return (
                                    <TableRow
                                        hover
                                        onClick={(event:MouseEvent) =>
                                            handleClick(event, row.name)
                                        }
                                        role="checkbox"
                                        tabIndex={-1}
                                        key={row.name}
                                        selected={isItemSelected}
                                    >
                                        <TableCell padding="checkbox">
                                            <Checkbox color="primary"/>
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
