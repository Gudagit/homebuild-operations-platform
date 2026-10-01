import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getPropertyById, getConstructionStages, getTasks, getInspections, updatePropertyStatus, createConstructionStage, createTask, createInspection, createIssue } from '../api/api'


function PropertyDetail() {
  const { id } = useParams()
  const [property, setProperty] = useState(null)
  const [stages, setStages] = useState([])
  const [error, setError] = useState(null)
  const [stageFormData, setStageFormData] = useState({ name: '', order: 1, status: 'not_started' })
  const [taskFormData, setTaskFormData] = useState({ title: '', status: 'not_started', stage_id: '' })
  const [inspectionFormData, setInspectionFormData] = useState({ inspector_name: '', result: 'pending', stage_id: '' })
  const [issueFormData, setIssueFormData] = useState({ title: '', priority: 'medium', status: 'open', inspection_id: '' })


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

  async function handleComplete() {
    try {
      const updated = await updatePropertyStatus(id, 'completed')
      setProperty(updated)
      setError(null)
    } catch (err) {
      setError(err.message)
    }
  }
  function handleStageChange(e) {
    setStageFormData({ ...stageFormData, [e.target.name]: e.target.value })
  }
  function handleTaskChange(e) {
    setTaskFormData({ ...taskFormData, [e.target.name]: e.target.value })
  }
  
  async function handleTaskSubmit(e) {
    e.preventDefault()
    const newTask = await createTask({ ...taskFormData, stage_id: Number(taskFormData.stage_id) })
    setStages(stages.map((stage) =>
      stage.id === newTask.stage_id
        ? { ...stage, tasks: [...stage.tasks, newTask] }
        : stage
    ))
    setTaskFormData({ title: '', status: 'not_started', stage_id: '' })
  }
  
  function handleInspectionChange(e) {
    setInspectionFormData({ ...inspectionFormData, [e.target.name]: e.target.value })
  }
  
  async function handleInspectionSubmit(e) {
    e.preventDefault()
    const newInspection = await createInspection({ ...inspectionFormData, stage_id: Number(inspectionFormData.stage_id) })
    setStages(stages.map((stage) =>
      stage.id === newInspection.stage_id
        ? { ...stage, inspections: [...stage.inspections, newInspection] }
        : stage
    ))
    setInspectionFormData({ inspector_name: '', result: 'pending', stage_id: '' })
  }
  function handleIssueChange(e) {
    setIssueFormData({ ...issueFormData, [e.target.name]: e.target.value })
  }
  
  async function handleIssueSubmit(e) {
    e.preventDefault()
    await createIssue({ ...issueFormData, inspection_id: Number(issueFormData.inspection_id) })
    setIssueFormData({ title: '', priority: 'medium', status: 'open', inspection_id: '' })
  }
  
  async function handleStageSubmit(e) {
    e.preventDefault()
    const newStage = await createConstructionStage({
      ...stageFormData,
      order: Number(stageFormData.order),
      property_id: Number(id),
    })
    setStages([...stages, { ...newStage, tasks: [], inspections: [] }])
    setStageFormData({ name: '', order: 1, status: 'not_started' })
  }
  

  if (!property) {
    return <p className="text-gray-400 p-6">Loading...</p>
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-100">{property.name}</h1>
      <p className="text-gray-400">Address: {property.address}</p>
      <p className="text-gray-400 mb-2">Status: {property.status}</p>

<button
  onClick={handleComplete}
  className="bg-green-900 hover:bg-green-800 text-white px-4 py-2 rounded mb-2"
>
  Mark as Completed
</button>

{error && (
  <p className="text-red-400 mb-6">{error}</p>
)}


      <h2 className="text-xl font-semibold text-gray-100 mb-3">Construction Stages</h2>
      <form onSubmit={handleStageSubmit} className="bg-[#12181a] border border-gray-800 rounded-lg p-4 space-y-3 max-w-md mb-4">
  <input
    name="name"
    value={stageFormData.name}
    onChange={handleStageChange}
    placeholder="Stage name (e.g. Foundation)"
    className="w-full bg-[#0a0f0d] border border-gray-700 rounded p-2 text-gray-100"
    required
  />
  <input
    name="order"
    type="number"
    value={stageFormData.order}
    onChange={handleStageChange}
    placeholder="Order"
    className="w-full bg-[#0a0f0d] border border-gray-700 rounded p-2 text-gray-100"
    required
  />
  <button type="submit" className="bg-green-900 hover:bg-green-800 text-white px-4 py-2 rounded">
    Add Stage
  </button>
</form>
<form onSubmit={handleTaskSubmit} className="bg-[#12181a] border border-gray-800 rounded-lg p-4 space-y-3 max-w-md mb-4">
  <input
    name="title"
    value={taskFormData.title}
    onChange={handleTaskChange}
    placeholder="Task title"
    className="w-full bg-[#0a0f0d] border border-gray-700 rounded p-2 text-gray-100"
    required
  />
  <select
    name="stage_id"
    value={taskFormData.stage_id}
    onChange={handleTaskChange}
    className="w-full bg-[#0a0f0d] border border-gray-700 rounded p-2 text-gray-100"
    required
  >
    <option value="">Select a stage</option>
    {stages.map((stage) => (
      <option key={stage.id} value={stage.id}>{stage.name}</option>
    ))}
  </select>
  <button type="submit" className="bg-green-900 hover:bg-green-800 text-white px-4 py-2 rounded">
    Add Task
  </button>
</form>

<form onSubmit={handleInspectionSubmit} className="bg-[#12181a] border border-gray-800 rounded-lg p-4 space-y-3 max-w-md mb-4">
  <input
    name="inspector_name"
    value={inspectionFormData.inspector_name}
    onChange={handleInspectionChange}
    placeholder="Inspector name"
    className="w-full bg-[#0a0f0d] border border-gray-700 rounded p-2 text-gray-100"
    required
  />
  <select
    name="stage_id"
    value={inspectionFormData.stage_id}
    onChange={handleInspectionChange}
    className="w-full bg-[#0a0f0d] border border-gray-700 rounded p-2 text-gray-100"
    required
  >
    <option value="">Select a stage</option>
    {stages.map((stage) => (
      <option key={stage.id} value={stage.id}>{stage.name}</option>
    ))}
  </select>
  <button type="submit" className="bg-green-900 hover:bg-green-800 text-white px-4 py-2 rounded">
    Add Inspection
  </button>
</form>
<form onSubmit={handleIssueSubmit} className="bg-[#12181a] border border-gray-800 rounded-lg p-4 space-y-3 max-w-md mb-4">
  <input
    name="title"
    value={issueFormData.title}
    onChange={handleIssueChange}
    placeholder="Issue title"
    className="w-full bg-[#0a0f0d] border border-gray-700 rounded p-2 text-gray-100"
    required
  />
  <select
    name="priority"
    value={issueFormData.priority}
    onChange={handleIssueChange}
    className="w-full bg-[#0a0f0d] border border-gray-700 rounded p-2 text-gray-100"
  >
    <option value="low">Low</option>
    <option value="medium">Medium</option>
    <option value="high">High</option>
  </select>
  <select
    name="inspection_id"
    value={issueFormData.inspection_id}
    onChange={handleIssueChange}
    className="w-full bg-[#0a0f0d] border border-gray-700 rounded p-2 text-gray-100"
    required
  >
    <option value="">Select an inspection</option>
    {stages.flatMap((stage) =>
      stage.inspections.map((inspection) => (
        <option key={inspection.id} value={inspection.id}>
          {stage.name} — {inspection.inspector_name} ({inspection.result})
        </option>
      ))
    )}
  </select>
  <button type="submit" className="bg-green-900 hover:bg-green-800 text-white px-4 py-2 rounded">
    Add Issue
  </button>
</form>

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
