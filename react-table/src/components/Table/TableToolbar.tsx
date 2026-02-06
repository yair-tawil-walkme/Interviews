import { useState } from 'react'
/* eslint-disable-next-line import/no-extraneous-dependencies */
import { useTranslation } from 'react-i18next'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import FilterListIcon from '@mui/icons-material/FilterList'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Checkbox from '@mui/material/Checkbox'
import { TABLE_TITLE_ID } from '../../constants'
import { cells } from './cells'
import './TableToolbar.scss'

const TableToolbar = ({
  numSelected,
  onDelete,
  visibleColumns,
  onToggleColumnVisibility,
}: {
  numSelected: number
  onDelete: () => void
  visibleColumns: Record<string, boolean>
  onToggleColumnVisibility: (columnId: string) => void
}) => {
  const { t } = useTranslation()
  const [columnMenuAnchor, setColumnMenuAnchor] = useState<null | HTMLElement>(
    null
  )

  const openColumnMenu = (event: React.MouseEvent<HTMLElement>) => {
    setColumnMenuAnchor(event.currentTarget)
  }

  const closeColumnMenu = () => {
    setColumnMenuAnchor(null)
  }

  const handleColumnToggle = (columnId: string) => {
    onToggleColumnVisibility(columnId)
  }

  return (
    <Toolbar
      className={`tableToolbar ${
        numSelected > 0 ? 'tableToolbarSelected' : ''
      }`}
    >
      {numSelected > 0 ? (
        <Typography
          className="tableToolbarTitle"
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {t('selectedCount', { count: numSelected })}
        </Typography>
      ) : (
        <Typography
          className="tableToolbarTitle"
          variant="h6"
          id={TABLE_TITLE_ID}
          component="div"
        >
          {t('tableTitle')}
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title={t('tooltipDelete')}>
          <IconButton onClick={onDelete} aria-label={t('ariaLabelDelete')}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <>
          <Tooltip title={t('tooltipFilterList')}>
            <IconButton
              onClick={openColumnMenu}
              aria-label={t('tooltipFilterList')}
              aria-haspopup="true"
              aria-expanded={Boolean(columnMenuAnchor)}
            >
              <FilterListIcon />
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={columnMenuAnchor}
            open={Boolean(columnMenuAnchor)}
            onClose={closeColumnMenu}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            {cells.map((cell) => (
              <MenuItem
                key={cell.id}
                onClick={() => handleColumnToggle(cell.id)}
                dense
              >
                <ListItemIcon>
                  <Checkbox
                    checked={visibleColumns[cell.id]}
                    disableRipple
                    size="small"
                  />
                </ListItemIcon>
                <ListItemText primary={t(cell.labelKey)} />
              </MenuItem>
            ))}
          </Menu>
        </>
      )}
    </Toolbar>
  )
}

export default TableToolbar
