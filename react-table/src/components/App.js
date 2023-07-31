import React, { useState } from 'react'
import Header from './Header'
import Table from './Table'
import { getUsers } from '../db/users'

const App = () => {
  const [rows] = useState(getUsers())
  const [searchText, setSearchText] = useState("");

  const onSearch = (searchText)=>{
    setSearchText(searchText);
  }

  return (
    <div>
      <Header onSearch={onSearch}/>
      <Table rows={rows} searchText={searchText}/>
    </div>
  )
}

export default App
