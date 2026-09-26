const BASE_URL = 'http://127.0.0.1:8000'

export async function getCommunities() {
  const response = await fetch(`${BASE_URL}/communities`)
  return response.json()
}

export async function getProperties() {
  const response = await fetch(`${BASE_URL}/properties`)
  return response.json()
}
export async function getPropertyById(id) {
  const response = await fetch(`${BASE_URL}/properties/${id}`)
  return response.json()
}
export async function getContractors() {
  const response = await fetch(`${BASE_URL}/contractors`)
  return response.json()
}
export async function getConstructionStages(propertyId) {
  const response = await fetch(`${BASE_URL}/construction-stages?property_id=${propertyId}`)
  return response.json()
}

export async function getTasks(stageId) {
  const response = await fetch(`${BASE_URL}/tasks?stage_id=${stageId}`)
  return response.json()
}

export async function getInspections(stageId) {
  const response = await fetch(`${BASE_URL}/inspections?stage_id=${stageId}`)
  return response.json()
}
export async function getIssues() {
  const response = await fetch(`${BASE_URL}/issues`)
  return response.json()
}
export async function getDocuments() {
  const response = await fetch(`${BASE_URL}/documents`)
  return response.json()
}
export async function createContractor(data) {
  const response = await fetch(`${BASE_URL}/contractors`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return response.json()
}
export async function updatePropertyStatus(id, status) {
  const response = await fetch(`${BASE_URL}/properties/${id}/status`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  })
  const data = await response.json()
  if (!response.ok) {
    throw new Error(data.detail)
  }
  return data
}
