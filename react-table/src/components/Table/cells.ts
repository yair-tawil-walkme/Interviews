import { Row } from '../../db/model'

type SortableRowKey = Exclude<keyof Row, 'id'>

export const cells = [
  {
    id: 'name' as SortableRowKey,
    numeric: false,
    disablePadding: true,
    label: 'Name',
  },
  {
    id: 'email' as SortableRowKey,
    numeric: false,
    disablePadding: false,
    label: 'Email',
  },
  {
    id: 'age' as SortableRowKey,
    numeric: true,
    disablePadding: false,
    label: 'Age',
  },
]
