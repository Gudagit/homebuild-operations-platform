import { Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import PropertyDetail from './pages/PropertyDetail'





function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/properties/:id" element={<PropertyDetail />} />
      <Route path="/properties/:id" element={<PropertyDetail />} />

    </Routes>
  )
}

export default App
