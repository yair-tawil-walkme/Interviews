import { MouseEvent, useMemo, useState } from 'react'
import { Row } from '../../db/model'
import { SORT_ASC, SORT_DESC, DEFAULT_ORDER_BY } from '../../constants'

/**
 * Returns rows that match the query in name, email, or age (case-insensitive).
 * Returns all rows when query is empty.
 */
function filterRowsByQuery(rows: Row[], query: string): Row[] {
  const normalizedQuery = query.trim().toLowerCase()
  if (!normalizedQuery) return rows
  return rows.filter(
    (row) =>
      row.name.toLowerCase().includes(normalizedQuery) ||
      row.email.toLowerCase().includes(normalizedQuery) ||
      String(row.age).toLowerCase().includes(normalizedQuery)
  )
}

/**
 * Returns a comparator for sorting rows by the given column and direction.
 * Uses localeCompare for strings, subtraction for numbers. Ties are broken by id for stable sort.
 */
function getRowComparator(
  orderBy: string,
  order: 'asc' | 'desc'
): (firstRow: Row, secondRow: Row) => number {
  return (firstRow, secondRow) => {
    const firstValue = firstRow[orderBy as keyof Row]
    const secondValue = secondRow[orderBy as keyof Row]

    let comparison = 0
    if (typeof firstValue === 'string' && typeof secondValue === 'string') {
      comparison = firstValue.localeCompare(secondValue, undefined, {
        sensitivity: 'base',
      })
    } else if (
      typeof firstValue === 'number' &&
      typeof secondValue === 'number'
    ) {
      comparison = firstValue - secondValue
    }

    if (order === SORT_DESC) comparison = -comparison
    return comparison !== 0 ? comparison : firstRow.id - secondRow.id
  }
}

export function useTableState(
  rows: Row[],
  setRows: React.Dispatch<React.SetStateAction<Row[]>>,
  searchQuery: string
) {
  const [order, setOrder] = useState<'asc' | 'desc'>(SORT_ASC)
  const [orderBy, setOrderBy] = useState<string>(DEFAULT_ORDER_BY)
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set())

  const filteredRows = useMemo(
    () => filterRowsByQuery(rows, searchQuery),
    [rows, searchQuery]
  )

  const handleRequestSort = (_event: MouseEvent, property: string) => {
    const isAsc = orderBy === property && order === SORT_ASC
    setOrder(isAsc ? SORT_DESC : SORT_ASC)
    setOrderBy(property)
  }

  const sortedRows = useMemo(
    () => [...filteredRows].sort(getRowComparator(orderBy, order)),
    [filteredRows, order, orderBy]
  )

  const handleSelectAllClick = () => {
    if (selectedIds.size === sortedRows.length) {
      const toRemove = new Set(sortedRows.map((row) => row.id))
      setSelectedIds((prev) => {
        const next = new Set(prev)
        toRemove.forEach((id) => next.delete(id))
        return next
      })
    } else {
      setSelectedIds((prev) => {
        const next = new Set(prev)
        sortedRows.forEach((row) => next.add(row.id))
        return next
      })
    }
  }

  const toggleSelection = (id: number) => {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const isSelected = (id: number) => selectedIds.has(id)

  const allSelected =
    sortedRows.length > 0 && selectedIds.size === sortedRows.length
  const someSelected = selectedIds.size > 0

  const handleDelete = () => {
    setRows((prev) => prev.filter((row) => !selectedIds.has(row.id)))
    setSelectedIds(new Set())
  }

  return {
    sortedRows,
    order,
    orderBy,
    handleRequestSort,
    selectedIds,
    toggleSelection,
    handleSelectAllClick,
    allSelected,
    someSelected,
    isSelected,
    handleDelete,
  }
}
