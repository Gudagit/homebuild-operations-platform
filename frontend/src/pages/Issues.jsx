import { useState, useEffect } from 'react'
import { getIssues } from '../api/api'

function Issues() {
  const [issues, setIssues] = useState([])

  useEffect(() => {
    getIssues().then(setIssues)
  }, [])

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-100 mb-6">Issues</h1>
      <div className="space-y-3">
        {issues.map((issue) => (
          <div key={issue.id} className="bg-[#12181a] border border-gray-800 rounded-lg p-4">
            <p className="text-gray-100 font-medium">{issue.title}</p>
            <p className="text-gray-400 text-sm">Priority: {issue.priority} — Status: {issue.status}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Issues

