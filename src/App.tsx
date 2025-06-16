import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Items } from './pages/Items'
import { ItemSingle } from './pages/ItemSingle'
import { MainLayout } from './pages/MainLayout'
function App() {

  return (
    <>
        <Routes>
          <Route element={<MainLayout/>}>
            <Route path="/" element={<Items/>}/>
            <Route path="/item/:normalizeName" element={<ItemSingle />} />
          </Route>
        </Routes>
    </>
  )
}

export default App
