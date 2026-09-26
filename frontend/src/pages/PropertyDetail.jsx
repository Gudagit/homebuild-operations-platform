import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getPropertyById, getConstructionStages, getTasks, getInspections } from '../api/api'


function PropertyDetail() {
  const { id } = useParams()
  const [property, setProperty] = useState(null)
  const [stages, setStages] = useState([])


  useEffect(() => {
    getPropertyById(id).then(setProperty)
    getConstructionStages(id).then(async (stagesData) => {
      const stagesWithDetails = await Promise.all(
        stagesData.map(async (stage) => {
          const tasks = await getTasks(stage.id)
          const inspections = await getInspections(stage.id)
          return { ...stage, tasks, inspections }
        })
      )
      setStages(stagesWithDetails)
    })
    
  }, [id])

  if (!property) {
    return <p>Loading...</p>
  }

  return (
    <div>
      <h1>{property.name}</h1>
      <p>Address: {property.address}</p>
      <p>Status: {property.status}</p>
  
      <h2>Construction Stages</h2>
      {stages.map((stage) => (
        <div key={stage.id} style={{ border: '1px solid gray', margin: '10px 0', padding: '10px' }}>
          <h3>{stage.name} — {stage.status}</h3>
  
          <p>Tasks:</p>
          <ul>
            {stage.tasks.map((task) => (
              <li key={task.id}>{task.title} — {task.status}</li>
            ))}
          </ul>
  
          <p>Inspections:</p>
          <ul>
            {stage.inspections.map((inspection) => (
              <li key={inspection.id}>{inspection.inspector_name} — {inspection.result}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
  
  
}

export default PropertyDetail
