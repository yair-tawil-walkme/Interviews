import { filterRows } from './filterRows'
import { Row } from '../db/model'

const sampleRows: Row[] = [
  { id: 1, name: 'Alice Smith', email: 'alice@example.com', age: 30 },
  { id: 2, name: 'Bob Jones', email: 'bob@example.com', age: 25 },
]

describe('filterRows', () => {
  it('returns rows when search is used', () => {
    const result = filterRows(sampleRows, '')
    expect(result.length).toBeGreaterThan(0)
  })
})
