import { createTheme, alpha } from '@mui/material/styles'

export type ThemeMode = 'light' | 'dark'

const primaryAccent = '#0d7377'
const primaryLight = '#0d9488'
const headerDark = '#0f0f0f'
const dividerLight = 'rgba(0, 0, 0, 0.08)'
const textPrimary = 'rgba(0, 0, 0, 0.87)'
const textSecondary = 'rgba(0, 0, 0, 0.6)'

const sharedTypography = {
  fontFamily:
    '"DM Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  h6: {
    fontWeight: 600,
    letterSpacing: '-0.01em',
  },
  subtitle1: {
    fontWeight: 600,
    letterSpacing: '-0.01em',
  },
  body1: {
    letterSpacing: '0.01em',
  },
} as const

export function getTheme(mode: ThemeMode) {
  const isDark = mode === 'dark'
  const paperBg = isDark ? '#fafafa' : '#ffffff'
  const backgroundDefault = isDark ? '#f0f0f0' : '#e8eef4'
  const appBarBg = isDark ? headerDark : primaryLight
  const appBarBorder = isDark ? alpha('#fff', 0.06) : alpha('#fff', 0.2)
  const paperShadow = isDark
    ? '0 2px 12px rgba(0, 0, 0, 0.06), 0 1px 3px rgba(0, 0, 0, 0.04)'
    : '0 4px 16px rgba(13, 148, 136, 0.08), 0 1px 4px rgba(0, 0, 0, 0.04)'
  const paperBorder = isDark ? dividerLight : alpha(primaryLight, 0.25)

  return createTheme({
    palette: {
      mode,
      primary: {
        main: isDark ? primaryAccent : primaryLight,
        dark: headerDark,
      },
      background: {
        default: backgroundDefault,
        paper: paperBg,
      },
      text: {
        primary: textPrimary,
        secondary: textSecondary,
      },
      divider: dividerLight,
      action: {
        hover: isDark ? 'rgba(0, 0, 0, 0.04)' : 'rgba(13, 148, 136, 0.06)',
      },
    },
    typography: sharedTypography,
    shape: {
      borderRadius: 12,
    },
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: appBarBg,
            color: '#fff',
            boxShadow: 'none',
            borderBottom: `1px solid ${appBarBorder}`,
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
            borderRadius: 12,
            boxShadow: paperShadow,
            border: `1px solid ${paperBorder}`,
          },
        },
      },
      MuiTableRow: {
        styleOverrides: {
          root: {
            transition: 'background-color 0.15s ease',
            '&.Mui-selected': {
              backgroundColor: alpha(
                isDark ? primaryAccent : primaryLight,
                0.12
              ),
              '&:hover': {
                backgroundColor: alpha(
                  isDark ? primaryAccent : primaryLight,
                  0.18
                ),
              },
            },
          },
        },
      },
      MuiCheckbox: {
        styleOverrides: {
          root: {
            color: textSecondary,
            '&.Mui-checked': {
              color: isDark ? primaryAccent : primaryLight,
            },
          },
        },
      },
      MuiTableSortLabel: {
        styleOverrides: {
          root: {
            '&.Mui-active': {
              color: textPrimary,
              fontWeight: 600,
            },
          },
        },
      },
    },
  })
}
