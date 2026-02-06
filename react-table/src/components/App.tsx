import { useState } from 'react'
import Header from './Header'
import Table from './Table/Table'
import { getRows } from '../db/rows'
import type { ThemeMode } from '../theme'

const App = ({
  onToggleTheme,
  themeMode,
}: {
  onToggleTheme: () => void
  themeMode: ThemeMode
}) => {
  const [rows, setRows] = useState(getRows())
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        minHeight: 0,
      }}
    >
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onToggleTheme={onToggleTheme}
        themeMode={themeMode}
      />
      <Table rows={rows} setRows={setRows} searchQuery={searchQuery} />
    </div>
  )
}

export default App
