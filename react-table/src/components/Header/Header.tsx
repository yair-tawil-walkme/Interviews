/* eslint-disable-next-line import/no-extraneous-dependencies */
import { useTranslation } from 'react-i18next'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import SearchIcon from '@mui/icons-material/Search'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'
import {
  StyledSearch,
  StyledSearchIconWrapper,
  StyledInputBase,
} from './Header.styles'
import './Header.scss'
import type { ThemeMode } from '../../theme'

const Header = ({
  searchQuery,
  onSearchChange,
  onToggleTheme,
  themeMode,
}: {
  searchQuery: string
  onSearchChange: (value: string) => void
  onToggleTheme: () => void
  themeMode: ThemeMode
}) => {
  const { t } = useTranslation()
  const isDark = themeMode === 'dark'
  return (
    <Box className="headerRoot">
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            className="headerTitle"
          >
            {t('appTitle')}
          </Typography>

          <StyledSearch>
            <StyledSearchIconWrapper>
              <SearchIcon />
            </StyledSearchIconWrapper>

            <StyledInputBase
              placeholder={t('searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              inputProps={{ 'aria-label': t('ariaLabelSearch') }}
            />
          </StyledSearch>

          <Tooltip
            title={isDark ? t('tooltipThemeLight') : t('tooltipThemeDark')}
          >
            <IconButton
              onClick={onToggleTheme}
              color="inherit"
              aria-label={t('ariaLabelThemeToggle')}
            >
              {isDark ? (
                <LightModeIcon aria-hidden />
              ) : (
                <DarkModeIcon aria-hidden />
              )}
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Header
