import { Routes, Route, Link } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import PropertyDetail from './pages/PropertyDetail'
import Contractors from './pages/Contractors'

function App() {
  return (
    <>
      <nav>
        <Link to="/">Dashboard</Link> | <Link to="/contractors">Contractors</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/properties/:id" element={<PropertyDetail />} />
        <Route path="/contractors" element={<Contractors />} />
      </Routes>
    </>
  )
}

export default App
