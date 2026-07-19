import { useEffect, useState } from 'react'
import { Row } from '../db/model'
import { filterRows } from '../utils/filterRows'

/**
 * Keeps displayed rows in sync with the toolbar search query.
 */
export const useFilteredRows = (rows: Row[], searchQuery: string): Row[] => {
  const [filteredRows, setFilteredRows] = useState(rows)

  useEffect(() => {
    setFilteredRows(filterRows(rows, searchQuery))
    // Only re-filter when the query changes to avoid unnecessary work.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery])

  return filteredRows
}
