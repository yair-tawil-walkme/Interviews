import { useState } from 'react'

type Props = {
  onFilter: (val: string) => void
}

export const Filter = (props: Props) => {
  const { onFilter } = props
  const [value, setValue] = useState('')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value.toLowerCase()
    setValue(newValue)
    onFilter(newValue)
  }

  return (
    <div>
      <input placeholder="Search…" value={value} onChange={handleChange} />
    </div>
  )
}

// search:
// Typing on the top <input> should filter rows on the table.
// condition: one or more  search term characters should be included on at least one of columns: name || email
// lower/upper case should lead to the same result.
