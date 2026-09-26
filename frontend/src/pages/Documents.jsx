import { useState, useEffect } from 'react'
import { getDocuments } from '../api/api'

function Documents() {
  const [documents, setDocuments] = useState([])

  useEffect(() => {
    getDocuments().then(setDocuments)
  }, [])

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-100 mb-6">Documents</h1>
      <div className="space-y-3">
        {documents.map((document) => (
          <div key={document.id} className="bg-[#12181a] border border-gray-800 rounded-lg p-4">
            <p className="text-gray-100 font-medium">{document.name}</p>
            <p className="text-gray-400 text-sm">Category: {document.category}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Documents
