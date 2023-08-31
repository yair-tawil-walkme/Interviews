export interface Row {
  id: number
  name: string
  email: string
  age: number
}

export type OrderByKey = 'name' | 'email' | 'age';
export type orderKey = 'asc' | 'desc';