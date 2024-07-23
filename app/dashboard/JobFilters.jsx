// components/JobFilters.js

'use client'

import React, { useState } from 'react'
import { ChevronDown, ArrowUpDown } from 'lucide-react'

const JobFilters = ({ onSortChange, onStatusChange }) => {
  const [sortOrder, setSortOrder] = useState('newest')
  const [statusFilter, setStatusFilter] = useState('All')

  const handleSortChange = () => {
    const newOrder = sortOrder === 'newest' ? 'oldest' : 'newest'
    setSortOrder(newOrder)
    onSortChange(newOrder)
  }

  const handleStatusChange = (status) => {
    setStatusFilter(status)
    onStatusChange(status)
  }

  const statusOptions = ['All', 'To Apply', 'Applied', 'Rejected', 'Offer']

  return (
    <div className="flex items-center gap-4">
      <button
        className={`btn btn-outline ${
          sortOrder === 'newest' ? 'btn-primary' : ''
        } gap-2`}
        onClick={handleSortChange}
      >
        <ArrowUpDown size={16} />
        {sortOrder === 'newest' ? 'Newest First' : 'Oldest First'}
      </button>

      <div className="dropdown">
        <label tabIndex={0} className="btn m-1">
          {statusFilter} <ChevronDown size={20} />
        </label>
        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
          {statusOptions.map((status) => (
            <li key={status}>
              <a
                className={statusFilter === status ? 'active' : ''}
                onClick={() => handleStatusChange(status)}
              >
                {status}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default JobFilters