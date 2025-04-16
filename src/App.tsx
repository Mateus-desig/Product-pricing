import React, { JSX } from 'react'
import './App.css'
import Header from './header'
import Table from './table'

function App(): JSX.Element {
  return (
    <div>
      <Header />
      <Table />
    </div>
  )
}

export default App
