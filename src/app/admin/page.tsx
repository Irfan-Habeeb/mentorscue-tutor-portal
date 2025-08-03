'use client'

import { useState } from 'react'
import { GraduationCap, Search, Filter, Eye, CheckCircle, XCircle, Clock } from 'lucide-react'
import Link from 'next/link'

interface Application {
  id: string
  personalInfo: {
    firstName: string
    lastName: string
    email: string
    phone: string
  }
  education: {
    degree: string
    institution: string
    graduationYear: string
  }
  experience: {
    yearsOfTeaching: string
    subjects: string[]
    classes: string[]
  }
  availability: {
    preferredHours: string
    availableDays: string[]
    timeZone: string
  }
  status: 'pending' | 'reviewed' | 'approved' | 'rejected'
  appliedAt: string
}

// Mock data
const mockApplications: Application[] = [
  {
    id: '1',
    personalInfo: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@email.com',
      phone: '+1-555-0123'
    },
    education: {
      degree: 'Master of Science in Mathematics',
      institution: 'Stanford University',
      graduationYear: '2020'
    },
    experience: {
      yearsOfTeaching: '3-5',
      subjects: ['Mathematics', 'Physics'],
      classes: ['Class 9-10', 'Class 11-12']
    },
    availability: {
      preferredHours: '10-20',
      availableDays: ['Monday', 'Wednesday', 'Friday'],
      timeZone: 'PST'
    },
    status: 'pending',
    appliedAt: '2024-01-15'
  },
  {
    id: '2',
    personalInfo: {
      firstName: 'Sarah',
      lastName: 'Johnson',
      email: 'sarah.johnson@email.com',
      phone: '+1-555-0456'
    },
    education: {
      degree: 'Bachelor of Arts in English',
      institution: 'Harvard University',
      graduationYear: '2018'
    },
    experience: {
      yearsOfTeaching: '5-10',
      subjects: ['English', 'Literature'],
      classes: ['Class 6-8', 'Class 9-10']
    },
    availability: {
      preferredHours: '20-30',
      availableDays: ['Tuesday', 'Thursday', 'Saturday'],
      timeZone: 'EST'
    },
    status: 'reviewed',
    appliedAt: '2024-01-10'
  },
  {
    id: '3',
    personalInfo: {
      firstName: 'Michael',
      lastName: 'Chen',
      email: 'michael.chen@email.com',
      phone: '+1-555-0789'
    },
    education: {
      degree: 'PhD in Computer Science',
      institution: 'MIT',
      graduationYear: '2022'
    },
    experience: {
      yearsOfTeaching: '1-3',
      subjects: ['Computer Science', 'Mathematics'],
      classes: ['Class 11-12', 'Undergraduate']
    },
    availability: {
      preferredHours: '5-10',
      availableDays: ['Monday', 'Tuesday', 'Wednesday'],
      timeZone: 'PST'
    },
    status: 'approved',
    appliedAt: '2024-01-05'
  }
]

export default function AdminPage() {
  const [applications, setApplications] = useState<Application[]>(mockApplications)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [subjectFilter, setSubjectFilter] = useState('all')
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null)

  const filteredApplications = applications.filter(app => {
    const matchesSearch = 
      app.personalInfo.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.personalInfo.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.personalInfo.email.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter
    const matchesSubject = subjectFilter === 'all' || app.experience.subjects.includes(subjectFilter)
    
    return matchesSearch && matchesStatus && matchesSubject
  })

  const updateApplicationStatus = (id: string, status: Application['status']) => {
    setApplications(prev => 
      prev.map(app => 
        app.id === id ? { ...app, status } : app
      )
    )
  }

  const getStatusColor = (status: Application['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'reviewed': return 'bg-blue-100 text-blue-800'
      case 'approved': return 'bg-green-100 text-green-800'
      case 'rejected': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: Application['status']) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4" />
      case 'reviewed': return <Eye className="h-4 w-4" />
      case 'approved': return <CheckCircle className="h-4 w-4" />
      case 'rejected': return <XCircle className="h-4 w-4" />
      default: return <Clock className="h-4 w-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <Link href="/" className="flex items-center text-gray-500 hover:text-gray-900">
              <GraduationCap className="h-5 w-5 mr-2" />
              Back to Home
            </Link>
            <div className="flex items-center">
              <GraduationCap className="h-8 w-8 text-blue-600" />
              <h1 className="ml-2 text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <GraduationCap className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Applications</p>
                <p className="text-2xl font-bold text-gray-900">{applications.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-gray-900">
                  {applications.filter(app => app.status === 'pending').length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Approved</p>
                <p className="text-2xl font-bold text-gray-900">
                  {applications.filter(app => app.status === 'approved').length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <XCircle className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Rejected</p>
                <p className="text-2xl font-bold text-gray-900">
                  {applications.filter(app => app.status === 'rejected').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="reviewed">Reviewed</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
              <select
                value={subjectFilter}
                onChange={(e) => setSubjectFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Subjects</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Physics">Physics</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Biology">Biology</option>
                <option value="English">English</option>
                <option value="Computer Science">Computer Science</option>
              </select>
            </div>
            
            <div className="flex items-end">
              <button
                onClick={() => {
                  setSearchTerm('')
                  setStatusFilter('all')
                  setSubjectFilter('all')
                }}
                className="w-full px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        {/* Applications Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Applications ({filteredApplications.length})</h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Applicant
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Education
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Experience
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Availability
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredApplications.map((application) => (
                  <tr key={application.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {application.personalInfo.firstName} {application.personalInfo.lastName}
                        </div>
                        <div className="text-sm text-gray-500">{application.personalInfo.email}</div>
                        <div className="text-sm text-gray-500">{application.personalInfo.phone}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm text-gray-900">{application.education.degree}</div>
                        <div className="text-sm text-gray-500">{application.education.institution}</div>
                        <div className="text-sm text-gray-500">{application.education.graduationYear}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm text-gray-900">{application.experience.yearsOfTeaching} years</div>
                        <div className="text-sm text-gray-500">
                          {application.experience.subjects.join(', ')}
                        </div>
                        <div className="text-sm text-gray-500">
                          {application.experience.classes.join(', ')}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm text-gray-900">{application.availability.preferredHours} hours/week</div>
                        <div className="text-sm text-gray-500">
                          {application.availability.availableDays.join(', ')}
                        </div>
                        <div className="text-sm text-gray-500">{application.availability.timeZone}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(application.status)}`}>
                        {getStatusIcon(application.status)}
                        <span className="ml-1">{application.status}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setSelectedApplication(application)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          View Details
                        </button>
                        {application.status === 'pending' && (
                          <>
                            <button
                              onClick={() => updateApplicationStatus(application.id, 'approved')}
                              className="text-green-600 hover:text-green-900"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => updateApplicationStatus(application.id, 'rejected')}
                              className="text-red-600 hover:text-red-900"
                            >
                              Reject
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Application Details Modal */}
      {selectedApplication && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Application Details
                </h3>
                <button
                  onClick={() => setSelectedApplication(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle className="h-6 w-6" />
                </button>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Personal Information</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Name:</span> {selectedApplication.personalInfo.firstName} {selectedApplication.personalInfo.lastName}
                    </div>
                    <div>
                      <span className="font-medium">Email:</span> {selectedApplication.personalInfo.email}
                    </div>
                    <div>
                      <span className="font-medium">Phone:</span> {selectedApplication.personalInfo.phone}
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Education</h4>
                  <div className="text-sm space-y-1">
                    <div><span className="font-medium">Degree:</span> {selectedApplication.education.degree}</div>
                    <div><span className="font-medium">Institution:</span> {selectedApplication.education.institution}</div>
                    <div><span className="font-medium">Graduation Year:</span> {selectedApplication.education.graduationYear}</div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Teaching Experience</h4>
                  <div className="text-sm space-y-1">
                    <div><span className="font-medium">Years:</span> {selectedApplication.experience.yearsOfTeaching}</div>
                    <div><span className="font-medium">Subjects:</span> {selectedApplication.experience.subjects.join(', ')}</div>
                    <div><span className="font-medium">Classes:</span> {selectedApplication.experience.classes.join(', ')}</div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Availability</h4>
                  <div className="text-sm space-y-1">
                    <div><span className="font-medium">Hours:</span> {selectedApplication.availability.preferredHours} per week</div>
                    <div><span className="font-medium">Days:</span> {selectedApplication.availability.availableDays.join(', ')}</div>
                    <div><span className="font-medium">Timezone:</span> {selectedApplication.availability.timeZone}</div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-200">
                {selectedApplication.status === 'pending' && (
                  <>
                    <button
                      onClick={() => {
                        updateApplicationStatus(selectedApplication.id, 'approved')
                        setSelectedApplication(null)
                      }}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => {
                        updateApplicationStatus(selectedApplication.id, 'rejected')
                        setSelectedApplication(null)
                      }}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    >
                      Reject
                    </button>
                  </>
                )}
                <button
                  onClick={() => setSelectedApplication(null)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}