import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import PropertyDetail from './pages/PropertyDetail'
import Contractors from './pages/Contractors'
import Issues from './pages/Issues'
import Documents from './pages/Documents'
import Login from './pages/Login'
import { getCurrentUser, logout } from './api/api'
import Register from './pages/Register'



function App() {
  const navigate = useNavigate()
  const currentUser = getCurrentUser()

  function handleLogout() {
    logout()
    navigate('/login') 
  }
  return (
    <>
      <nav className="bg-[#0f1512] border-b border-gray-800 px-6 py-4 flex gap-6 items-center">
  <Link to="/" className="text-gray-300 hover:text-white">Dashboard</Link>
  <Link to="/contractors" className="text-gray-300 hover:text-white">Contractors</Link>
  <Link to="/issues" className="text-gray-300 hover:text-white">Issues</Link>
  <Link to="/documents" className="text-gray-300 hover:text-white">Documents</Link>

  <span className="flex-grow" />

  {currentUser ? (
    <>
      <span className="text-gray-400 text-sm">Logged in as {currentUser.email} ({currentUser.role})</span>
      <button onClick={handleLogout} className="text-gray-300 hover:text-white text-sm">Logout</button>
    </>
  ) : (
    <>
    <Link to="/login" className="text-gray-300 hover:text-white">Login</Link>
  <Link to="/register" className="text-gray-300 hover:text-white">Register</Link>
  </>
  )}
</nav>

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/properties/:id" element={<PropertyDetail />} />
        <Route path="/contractors" element={<Contractors />} />
        <Route path="/issues" element={<Issues />} />
        <Route path="/documents" element={<Documents />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />



      </Routes>
    </>
  )
}

export default App
