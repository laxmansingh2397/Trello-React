import Boards from './component/boards/Boards'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import { Link } from 'react-router-dom'
import ListPage from './pages/ListPage'

function App() {

  

  return (
    <>
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='ListPage/:id/:name' element={<ListPage />} />
    </Routes>
    </>
  )
}

export default App;
