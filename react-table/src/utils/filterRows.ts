import { Row } from '../db/model'

/** Case-insensitive filter on name and email. */
export const filterRows = (rows: Row[], query: string): Row[] => {
  const trimmed = query.trim().toLowerCase()
  if (!trimmed) return rows

  return rows.filter(
    (row) =>
      row.name.toLowerCase().includes(trimmed) ||
      row.email.toLowerCase().includes(trimmed)
  )
}
