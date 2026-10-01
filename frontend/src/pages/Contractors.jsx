import { useState, useEffect } from 'react'
import { getContractors, createContractor } from '../api/api'


function Contractors() {
  const [contractors, setContractors] = useState([])
  const [formData, setFormData] = useState({ name: '', specialty: '', phone: '', email: '' })


  useEffect(() => {
    getContractors().then(setContractors)
  }, [])

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  
  async function handleSubmit(e) {
    e.preventDefault()
    const newContractor = await createContractor(formData)
    setContractors([...contractors, newContractor])
    setFormData({ name: '', specialty: '', phone: '', email: '' })
  }
  
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-100 mb-6">Contractors</h1>
      <form onSubmit={handleSubmit} className="mb-6 bg-[#12181a] border border-gray-800 rounded-lg p-4 space-y-3">
  <input
    name="name"
    value={formData.name}
    onChange={handleChange}
    placeholder="Name"
    className="w-full bg-[#0a0f0d] border border-gray-700 rounded p-2 text-gray-100"
    required
  />
  <input
    name="specialty"
    value={formData.specialty}
    onChange={handleChange}
    placeholder="Specialty"
    className="w-full bg-[#0a0f0d] border border-gray-700 rounded p-2 text-gray-100"
  />
  <input
    name="phone"
    value={formData.phone}
    onChange={handleChange}
    placeholder="Phone"
    className="w-full bg-[#0a0f0d] border border-gray-700 rounded p-2 text-gray-100"
  />
  <input
    name="email"
    value={formData.email}
    onChange={handleChange}
    placeholder="Email"
    className="w-full bg-[#0a0f0d] border border-gray-700 rounded p-2 text-gray-100"
  />
  <button
    type="submit"
    className="bg-green-900 hover:bg-green-800 text-white px-4 py-2 rounded"
  >
    Add Contractor
  </button>
</form>

      <div className="space-y-3">
        {contractors.map((contractor) => (
          <div key={contractor.id} className="bg-[#12181a] border border-gray-800 rounded-lg p-4">
            <p className="text-gray-100 font-medium">{contractor.name}</p>
            <p className="text-gray-400 text-sm">{contractor.specialty}</p>
            <p className="text-gray-400 text-sm">{contractor.phone}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Contractors
