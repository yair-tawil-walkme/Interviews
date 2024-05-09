import { EnumType } from "typescript"

export interface Row {
  id: number
  name: string
  email: string
  age: number
}

export type ColumnsType = 'name' | 'age' | 'email'
