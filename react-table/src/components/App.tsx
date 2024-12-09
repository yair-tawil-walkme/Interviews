import { useState } from 'react'
import Header from './Header'
import Table from './Table/Table'
import { getRows } from '../db/rows'

const App = () => {
  const [rows] = useState(getRows())
  const [searchText, setSearchText] = useState('');

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSearchText(e.target.value)
  }

  return (
    <div>
      <Header searchText={searchText} onChange={onChangeSearch}/>
      <Table rows={rows} searchText={searchText} />
    </div>
  )
}

export default App
