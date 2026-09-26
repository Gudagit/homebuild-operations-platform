import { useState, useEffect } from 'react'
import { getCommunities, getProperties } from '../api/api'
import { Link } from 'react-router-dom'


function Dashboard() {
  const [communities, setCommunities] = useState([])
  const [properties, setProperties] = useState([])

  useEffect(() => {
    getCommunities().then(setCommunities)
    getProperties().then(setProperties)
  }, [])

  return (
    <div>
      <h1>HomeBuild Operations Platform</h1>

      <h2>Communities</h2>
      <ul>
        {communities.map((community) => (
          <li key={community.id}>
            {community.name} — {community.location}
          </li>
        ))}
      </ul>

      <h2>Properties</h2>
      <ul>
      {properties.map((property) => (
  <li key={property.id}>
    <Link to={`/properties/${property.id}`}>
      {property.name} — {property.address} — Status: {property.status}
    </Link>
  </li>
))}

      </ul>
    </div>
  )
}

export default Dashboard

