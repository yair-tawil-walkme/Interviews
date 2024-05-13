import { atom, useAtom } from 'jotai'
import FilterObject from '../types/filterObject'
import { Row, ColumnsType } from '../db/model'
import sortObject from '../types/sortTypes'

const tableFilterDataAtom = atom<FilterObject>({search : '', sort:{orderBy:'name', order:'asc'}})

export const useTableFilterData = () => useAtom(tableFilterDataAtom)

const selectedRowsAtom = atom<number[]>([]) 

export const useSelectedRows = () => useAtom(selectedRowsAtom)

const deletedRows = atom<number[]>([]) 

export const useDeletedRows = () => useAtom(deletedRows)

export const getNewOrder = (order : undefined | 'asc' | 'desc') => {
    if(!order) return 'asc'
    return order ==='asc' ? 'desc' : 'asc'
}

const sortDescFunc = (a: Row, b: Row, orderBy: 'name' | 'email' | 'age')  => {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

const sortedArray = (rows: Row[], sortObject : sortObject) => {
    const {orderBy} = sortObject
    if(sortObject.order ==='desc') return rows.sort((a,b) =>  - sortDescFunc(a,b,orderBy))
    
    return rows.sort((a,b) => sortDescFunc(a,b,orderBy))
}

export const sortRows = (rows: Row[], sortObject : sortObject) => {
    if(!sortObject.order) return rows

    return sortedArray(rows,sortObject)
} 
