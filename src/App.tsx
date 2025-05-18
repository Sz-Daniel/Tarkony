import { useState } from 'react'
import './App.css'
import { DataShow } from './devtools/dataShow'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>

      <DataShow />
      
    </>
  )
}

export default App
