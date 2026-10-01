import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { register } from '../api/api'

function Register() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'manager' })
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      await register(formData)
      navigate('/login')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="max-w-sm mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-100 mb-6">Register</h1>
      <form onSubmit={handleSubmit} className="bg-[#12181a] border border-gray-800 rounded-lg p-4 space-y-3">
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          className="w-full bg-[#0a0f0d] border border-gray-700 rounded p-2 text-gray-100"
          required
        />
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full bg-[#0a0f0d] border border-gray-700 rounded p-2 text-gray-100"
          required
        />
        <input
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          className="w-full bg-[#0a0f0d] border border-gray-700 rounded p-2 text-gray-100"
          required
        />
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full bg-[#0a0f0d] border border-gray-700 rounded p-2 text-gray-100"
        >
          <option value="manager">Manager</option>
          <option value="contractor">Contractor</option>
          <option value="inspector">Inspector</option>
        </select>
        <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded">
          Register
        </button>
        {error && <p className="text-red-400">{error}</p>}
      </form>
    </div>
  )
}

export default Register
