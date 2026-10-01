import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../api/api'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      const data = await login(email, password)
      localStorage.setItem('token', data.access_token)
      navigate('/')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="max-w-sm mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-100 mb-6">Login</h1>
      <form onSubmit={handleSubmit} className="bg-[#12181a] border border-gray-800 rounded-lg p-4 space-y-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full bg-[#0a0f0d] border border-gray-700 rounded p-2 text-gray-100"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full bg-[#0a0f0d] border border-gray-700 rounded p-2 text-gray-100"
          required
        />
        <button type="submit" className="bg-green-900 hover:bg-green-800 text-white px-4 py-2 rounded">
          Login
        </button>
        {error && <p className="text-red-400">{error}</p>}
      </form>
    </div>
  )
}

export default Login
