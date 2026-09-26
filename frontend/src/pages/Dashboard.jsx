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
    <div className="max-w-3xl mx-auto p-6">

      <h1 className="text-3xl font-bold text-gray-100">HomeBuild Operations Platform</h1>


      <h2 className="text-xl font-semibold mt-6 mb-2">Communities</h2>
        <ul className="space-y-1">
          {communities.map((community) => (
            <li key={community.id} className="text-gray-400">

              {community.name} — {community.location}
            </li>
          ))}
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2">Properties</h2>

        <ul className="space-y-1">
            {properties.map((property) => (
              <li key={property.id}>
                <Link
                  to={`/properties/${property.id}`}
                  className="text-gray-300 hover:text-white hover:underline"
          >

        {property.name} — {property.address} — Status: {property.status}
      </Link>
    </li>
  ))}
</ul>

    </div>
  )
}

export default Dashboard

