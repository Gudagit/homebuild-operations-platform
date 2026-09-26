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
