import { Row } from '../db/model'

type Order = 'asc' | 'desc'

/**
 * Returns a new array sorted by the given column.
 * Supports name, email, and age columns.
 */
export const sortRows = (
  rows: Row[],
  orderBy: keyof Row,
  order: Order
): Row[] => {
  return [...rows].sort((a, b) => {
    const aVal = String(a[orderBy])
    const bVal = String(b[orderBy])

    if (aVal < bVal) return order === 'asc' ? -1 : 1
    if (aVal > bVal) return order === 'asc' ? 1 : -1
    return 0
  })
}
