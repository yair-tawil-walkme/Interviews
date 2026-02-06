import { COLUMN_ID_NAME, COLUMN_ID_EMAIL, COLUMN_ID_AGE } from '../../constants'

export const cells = [
  {
    id: COLUMN_ID_NAME,
    numeric: false,
    disablePadding: true,
    labelKey: 'columnLabelName',
  },
  {
    id: COLUMN_ID_EMAIL,
    numeric: true,
    disablePadding: false,
    labelKey: 'columnLabelEmail',
  },
  {
    id: COLUMN_ID_AGE,
    numeric: true,
    disablePadding: false,
    labelKey: 'columnLabelAge',
  },
]
