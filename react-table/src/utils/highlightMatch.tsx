import { ReactNode } from 'react'

/**
 * Returns a React node with the matching substring wrapped in <strong>.
 * Case-insensitive match. If query is empty or not found, returns plain text.
 */
export function highlightMatch(text: string, query: string): ReactNode {
  const q = query.trim().toLowerCase()
  if (!q) return text
  const lower = text.toLowerCase()
  const idx = lower.indexOf(q)
  if (idx === -1) return text
  const before = text.slice(0, idx)
  const match = text.slice(idx, idx + q.length)
  const after = text.slice(idx + q.length)
  return (
    <>
      {before}
      <strong className="searchHighlight">{match}</strong>
      {after}
    </>
  )
}
