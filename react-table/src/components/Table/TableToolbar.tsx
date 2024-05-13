import Toolbar from '@mui/material/Toolbar'
import { alpha } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import FilterListIcon from '@mui/icons-material/FilterList'

import { useDeletedRows, useSelectedRows } from '../../utils/row'

const TableToolbar = ({ numSelected, rowsLength }: { numSelected: number, rowsLength: number }) => {
  const [selectedRows, setSelectedRows] = useSelectedRows()
  const [_, setDeletedRows] = useDeletedRows()

  const onDeleteSelectedRows = () => {
    setDeletedRows(prev => Array.from(new Set([...prev, ...selectedRows])))
    setSelectedRows([])
  }

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
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
          {numSelected} / {rowsLength} selected
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
          <IconButton onClick={onDeleteSelectedRows}>
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

export default TableToolbar
