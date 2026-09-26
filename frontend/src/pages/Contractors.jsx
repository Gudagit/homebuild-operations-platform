import { useState, useEffect } from 'react'
import { getContractors } from '../api/api'

function Contractors() {
  const [contractors, setContractors] = useState([])

  useEffect(() => {
    getContractors().then(setContractors)
  }, [])

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-100 mb-6">Contractors</h1>
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
