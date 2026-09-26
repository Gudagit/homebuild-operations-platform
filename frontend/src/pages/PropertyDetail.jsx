import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getPropertyById } from '../api/api'

function PropertyDetail() {
  const { id } = useParams()
  const [property, setProperty] = useState(null)

  useEffect(() => {
    getPropertyById(id).then(setProperty)
  }, [id])

  if (!property) {
    return <p>Loading...</p>
  }

  return (
    <div>
      <h1>{property.name}</h1>
      <p>Address: {property.address}</p>
      <p>Status: {property.status}</p>
    </div>
  )
}

export default PropertyDetail
