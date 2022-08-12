import { useState } from 'react'
import Registro from './Components/Registro/Registro'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Registro></Registro>
    </div>
  )
}

export default App
