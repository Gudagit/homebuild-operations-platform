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
    return <p className="text-gray-400 p-6">Loading...</p>
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-100">{property.name}</h1>
      <p className="text-gray-400">Address: {property.address}</p>
      <p className="text-gray-400 mb-6">Status: {property.status}</p>

      <h2 className="text-xl font-semibold text-gray-100 mb-3">Construction Stages</h2>
      <div className="space-y-4">
        {stages.map((stage) => (
          <div key={stage.id} className="bg-[#12181a] border border-gray-800 rounded-lg p-4">
            <h3 className="text-lg font-medium text-gray-100 mb-2">
              {stage.name} — <span className="text-gray-400">{stage.status}</span>
            </h3>

            <p className="text-sm font-semibold text-gray-300 mt-3">Tasks</p>
            <ul className="space-y-1">
              {stage.tasks.map((task) => (
                <li key={task.id} className="text-gray-400 text-sm">
                  {task.title} — {task.status}
                </li>
              ))}
            </ul>

            <p className="text-sm font-semibold text-gray-300 mt-3">Inspections</p>
            <ul className="space-y-1">
              {stage.inspections.map((inspection) => (
                <li key={inspection.id} className="text-gray-400 text-sm">
                  {inspection.inspector_name} — {inspection.result}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PropertyDetail
