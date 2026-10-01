import { useState, useEffect } from 'react'
import { getCommunities, getProperties, createProperty, createCommunity } from '../api/api'
import { Link } from 'react-router-dom'


function Dashboard() {
  const [communities, setCommunities] = useState([])
  const [properties, setProperties] = useState([])
  const [formData, setFormData] = useState({ name: '', address: '', status: 'in_progress', community_id: '' })
  const [communityFormData, setCommunityFormData] = useState({ name: '', location: '' })
  
  useEffect(() => {
    getCommunities().then(setCommunities)
    getProperties().then(setProperties)
  }, [])
  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  
  async function handleSubmit(e) {
    e.preventDefault()
    const newProperty = await createProperty({ ...formData, community_id: Number(formData.community_id) })
    setProperties([...properties, newProperty])
    setFormData({ name: '', address: '', status: 'in_progress', community_id: '' })
  }
  
  function handleCommunityChange(e) {
    setCommunityFormData({ ...communityFormData, [e.target.name]: e.target.value })
  }
  
  async function handleCommunitySubmit(e) {
    e.preventDefault()
    const newCommunity = await createCommunity(communityFormData)
    setCommunities([...communities, newCommunity])
    setCommunityFormData({ name: '', location: '' })
  }
  
  return (
    <div className="max-w-3xl mx-auto p-6">

      <h1 className="text-3xl font-bold text-gray-100">HomeBuild Operations Platform</h1>


      <h2 className="text-xl font-semibold mt-6 mb-2">Communities</h2>
        <form onSubmit={handleCommunitySubmit} className="bg-[#12181a] border border-gray-800 rounded-lg p-4 space-y-3 max-w-md mb-4">
  <input
    name="name"
    value={communityFormData.name}
    onChange={handleCommunityChange}
    placeholder="Community name"
    className="w-full bg-[#0a0f0d] border border-gray-700 rounded p-2 text-gray-100"
    required
  />
  <input
    name="location"
    value={communityFormData.location}
    onChange={handleCommunityChange}
    placeholder="Location"
    className="w-full bg-[#0a0f0d] border border-gray-700 rounded p-2 text-gray-100"
  />
  <button type="submit" className="bg-green-900 hover:bg-green-800 text-white px-4 py-2 rounded">
    Add Community
  </button>
</form>
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
<h2 className="text-xl font-semibold mt-6 mb-2">Add Property</h2>
<form onSubmit={handleSubmit} className="bg-[#12181a] border border-gray-800 rounded-lg p-4 space-y-3 max-w-md">
  <input
    name="name"
    value={formData.name}
    onChange={handleChange}
    placeholder="Property name"
    className="w-full bg-[#0a0f0d] border border-gray-700 rounded p-2 text-gray-100"
    required
  />
  <input
    name="address"
    value={formData.address}
    onChange={handleChange}
    placeholder="Address"
    className="w-full bg-[#0a0f0d] border border-gray-700 rounded p-2 text-gray-100"
  />
  <select
    name="community_id"
    value={formData.community_id}
    onChange={handleChange}
    className="w-full bg-[#0a0f0d] border border-gray-700 rounded p-2 text-gray-100"
    required
  >
    <option value="">Select a community</option>
    {communities.map((community) => (
      <option key={community.id} value={community.id}>{community.name}</option>
    ))}
  </select>
  <button type="submit" className="bg-green-900 hover:bg-green-800 text-white px-4 py-2 rounded">
    Add Property
  </button>
</form>

    </div>
  )
}

export default Dashboard

