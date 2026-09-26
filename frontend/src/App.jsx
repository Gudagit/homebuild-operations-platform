import { Routes, Route, Link } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import PropertyDetail from './pages/PropertyDetail'
import Contractors from './pages/Contractors'
import Issues from './pages/Issues'
import Documents from './pages/Documents'


function App() {
  return (
    <>
      <nav className="bg-[#0f1512] border-b border-gray-800 px-6 py-4 flex gap-6">
        <Link to="/" className="text-gray-300 hover:text-white">Dashboard</Link>
        <Link to="/contractors" className="text-gray-300 hover:text-white">Contractors</Link>
        <Link to="/issues" className="text-gray-300 hover:text-white">Issues</Link>
       <Link to="/documents" className="text-gray-300 hover:text-white">Documents</Link>

      </nav>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/properties/:id" element={<PropertyDetail />} />
        <Route path="/contractors" element={<Contractors />} />
        <Route path="/issues" element={<Issues />} />
        <Route path="/documents" element={<Documents />} />


      </Routes>
    </>
  )
}

export default App
