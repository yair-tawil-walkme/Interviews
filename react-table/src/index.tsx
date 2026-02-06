import React, { useMemo, useState, useCallback, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import './i18n'
import './index.scss'
import { getTheme, ThemeMode } from './theme'
import App from './components/App'

const THEME_STORAGE_KEY = 'nutrition-table-theme'

const ThemeWrapper = () => {
  const [mode, setMode] = useState<ThemeMode>(() => {
    try {
      const stored = localStorage.getItem(THEME_STORAGE_KEY) as ThemeMode | null
      return stored === 'light' || stored === 'dark' ? stored : 'dark'
    } catch {
      return 'dark'
    }
  })

  useEffect(() => {
    document.documentElement.dataset.theme = mode
  }, [mode])

  const theme = useMemo(() => getTheme(mode), [mode])

  const toggleTheme = useCallback(() => {
    setMode((prev: ThemeMode) => {
      const next = prev === 'dark' ? 'light' : 'dark'
      try {
        localStorage.setItem(THEME_STORAGE_KEY, next)
      } catch {
        /* ignore */
      }
      return next
    })
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App onToggleTheme={toggleTheme} themeMode={mode} />
    </ThemeProvider>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <ThemeWrapper />
  </React.StrictMode>
)
