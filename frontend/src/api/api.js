const BASE_URL = import.meta.env.VITE_API_URL

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
  const token = localStorage.getItem('token')
  const response = await fetch(`${BASE_URL}/properties/${id}/status`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ status }),
  })
  const data = await response.json()
  if (!response.ok) {
    throw new Error(data.detail)
  }
  return data
}

export async function login(email, password) {
  const response = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })
  const data = await response.json()
  if (!response.ok) {
    throw new Error(data.detail)
  }
  return data
}

export function getCurrentUser() {
  const token = localStorage.getItem('token')
  if (!token) return null

  const payload = token.split('.')[1]
  const decoded = JSON.parse(atob(payload))
  return { email: decoded.sub, role: decoded.role }
}

export function logout() {
  localStorage.removeItem('token')
}
export async function register(data) {
  const response = await fetch(`${BASE_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  const result = await response.json()
  if (!response.ok) {
    throw new Error(result.detail)
  }
  return result
}
export async function createProperty(data) {
  const token = localStorage.getItem('token')
  const response = await fetch(`${BASE_URL}/properties`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
  const result = await response.json()
  if (!response.ok) {
    throw new Error(result.detail)
  }
  return result
}
export async function createConstructionStage(data) {
  const token = localStorage.getItem('token')
  const response = await fetch(`${BASE_URL}/construction-stages`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
  const result = await response.json()
  if (!response.ok) {
    throw new Error(result.detail)
  }
  return result
}
export async function createTask(data) {
  const token = localStorage.getItem('token')
  const response = await fetch(`${BASE_URL}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
  const result = await response.json()
  if (!response.ok) {
    throw new Error(result.detail)
  }
  return result
}

export async function createInspection(data) {
  const token = localStorage.getItem('token')
  const response = await fetch(`${BASE_URL}/inspections`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
  const result = await response.json()
  if (!response.ok) {
    throw new Error(result.detail)
  }
  return result
}
export async function createCommunity(data) {
  const token = localStorage.getItem('token')
  const response = await fetch(`${BASE_URL}/communities`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
  const result = await response.json()
  if (!response.ok) {
    throw new Error(result.detail)
  }
  return result
}
export async function createIssue(data) {
  const token = localStorage.getItem('token')
  const response = await fetch(`${BASE_URL}/issues`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
  const result = await response.json()
  if (!response.ok) {
    throw new Error(result.detail)
  }
  return result
}
