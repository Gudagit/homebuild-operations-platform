import { useState, useEffect } from 'react'
import { getContractors } from '../api/api'

function Contractors() {
  const [contractors, setContractors] = useState([])

  useEffect(() => {
    getContractors().then(setContractors)
  }, [])

  return (
    <div>
      <h1>Contractors</h1>
      <ul>
        {contractors.map((contractor) => (
          <li key={contractor.id}>
            {contractor.name} — {contractor.specialty} — {contractor.phone}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Contractors
