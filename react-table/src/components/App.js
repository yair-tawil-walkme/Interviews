import React, { useState } from 'react'
import Header from './Header'
import Table from './Table'
import { getUsers } from '../db/users'

const App = () => {
  const [rows] = useState(getUsers())
  const [searchValue, setSearchValue] = useState('')

  const onChangeSearchBar = (e) => {
    setSearchValue(e.target.value)
  }

  return (
    <div>
      <Header searchValue={searchValue} onChange={onChangeSearchBar}/>
      <Table rows={rows} searchValue={searchValue}/>
    </div>
  )
}

export default App
