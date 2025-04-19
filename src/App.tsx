import { JSX, useState } from 'react'
import './App.css'
import Header from './header'
import Table from './table'

function App(): JSX.Element {

  const [productVal, setPdVal] = useState("")

  return (
    <div>
       <Header onChange={setPdVal} productVal={productVal} />
       <Table productVal={productVal} />
    </div>
  )
}

export default App
