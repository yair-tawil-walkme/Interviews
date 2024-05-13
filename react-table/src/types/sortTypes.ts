import { ColumnsType } from "../db/model"

type sortObject = {
    orderBy : ColumnsType,
    order: undefined | 'asc' | 'desc'
}

export default sortObject