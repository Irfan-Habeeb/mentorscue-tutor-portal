'use client'

import { useState, useEffect } from 'react'
import { GraduationCap, Calendar, Clock, Users, MapPin, BookOpen, ArrowLeft, CheckCircle, XCircle, Plus, Edit, Trash2 } from 'lucide-react'
import Link from 'next/link'

interface Tutor {
  id: string
  name: string
  subjects: string[]
  classes: string[]
  experience: string
  rating: number
  hourlyRate: number
  timezone: string
  status: 'active' | 'inactive' | 'on_leave'
}

interface Schedule {
  id: string
  tutorId: string
  tutorName: string
  date: string
  startTime: string
  endTime: string
  subject: string
  classLevel: string
  studentName: string
  studentContact: string
  status: 'scheduled' | 'completed' | 'cancelled'
  notes?: string
}

interface TimeSlot {
  id: string
  startTime: string
  endTime: string
  isAvailable: boolean
  isScheduled: boolean
  schedule?: Schedule
}

// Mock data
const mockTutors: Tutor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    subjects: ['Mathematics', 'Physics'],
    classes: ['Class 9-10', 'Class 11-12'],
    experience: '5-10 years',
    rating: 4.8,
    hourlyRate: 45,
    timezone: 'EST',
    status: 'active'
  },
  {
    id: '2',
    name: 'Prof. Michael Chen',
    subjects: ['Computer Science', 'Mathematics'],
    classes: ['Class 11-12', 'Undergraduate'],
    experience: '3-5 years',
    rating: 4.9,
    hourlyRate: 50,
    timezone: 'PST',
    status: 'active'
  },
  {
    id: '3',
    name: 'Ms. Emily Davis',
    subjects: ['English', 'Literature'],
    classes: ['Class 6-8', 'Class 9-10'],
    experience: '1-3 years',
    rating: 4.7,
    hourlyRate: 35,
    timezone: 'EST',
    status: 'active'
  },
  {
    id: '4',
    name: 'Mr. David Wilson',
    subjects: ['Chemistry', 'Biology'],
    classes: ['Class 9-10', 'Class 11-12'],
    experience: '2-4 years',
    rating: 4.6,
    hourlyRate: 40,
    timezone: 'EST',
    status: 'active'
  }
]

const timeSlots = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
  '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
  '18:00', '18:30', '19:00', '19:30', '20:00', '20:30'
]

const subjects = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'Computer Science', 'Literature']
const classes = ['Class 1-5', 'Class 6-8', 'Class 9-10', 'Class 11-12', 'Undergraduate']

export default function SchedulePage() {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedTutor, setSelectedTutor] = useState<Tutor | null>(null)
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(null)
  const [showScheduleForm, setShowScheduleForm] = useState(false)
  const [showAddTutorForm, setShowAddTutorForm] = useState(false)
  const [schedules, setSchedules] = useState<Schedule[]>([])
  const [filterSubject, setFilterSubject] = useState('all')
  const [filterClass, setFilterClass] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')

  const [scheduleData, setScheduleData] = useState({
    subject: '',
    classLevel: '',
    studentName: '',
    studentContact: '',
    notes: ''
  })

  const [newTutorData, setNewTutorData] = useState({
    name: '',
    subjects: [] as string[],
    classes: [] as string[],
    experience: '',
    hourlyRate: '',
    timezone: '',
    status: 'active' as 'active' | 'inactive' | 'on_leave'
  })

  const filteredTutors = mockTutors.filter(tutor => {
    const matchesSubject = filterSubject === 'all' || tutor.subjects.includes(filterSubject)
    const matchesClass = filterClass === 'all' || tutor.classes.includes(filterClass)
    const matchesStatus = filterStatus === 'all' || tutor.status === filterStatus
    return matchesSubject && matchesClass && matchesStatus
  })

  const generateTimeSlots = (date: Date, tutor: Tutor): TimeSlot[] => {
    return timeSlots.map((time, index) => {
      const existingSchedule = schedules.find(s => 
        s.tutorId === tutor.id && 
        s.date === date.toISOString().split('T')[0] && 
        s.startTime === time
      )

      return {
        id: `${date.toISOString()}-${time}-${tutor.id}`,
        startTime: time,
        endTime: timeSlots[index + 1] || '21:00',
        isAvailable: !existingSchedule,
        isScheduled: !!existingSchedule,
        schedule: existingSchedule
      }
    })
  }

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date)
    setSelectedTimeSlot(null)
  }

  const handleTutorSelect = (tutor: Tutor) => {
    setSelectedTutor(tutor)
    setSelectedTimeSlot(null)
  }

  const handleTimeSlotSelect = (slot: TimeSlot) => {
    if (slot.isAvailable) {
      setSelectedTimeSlot(slot)
    }
  }

  const handleScheduleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!selectedTutor || !selectedTimeSlot) return

    const newSchedule: Schedule = {
      id: Date.now().toString(),
      tutorId: selectedTutor.id,
      tutorName: selectedTutor.name,
      date: selectedDate.toISOString().split('T')[0],
      startTime: selectedTimeSlot.startTime,
      endTime: selectedTimeSlot.endTime,
      subject: scheduleData.subject,
      classLevel: scheduleData.classLevel,
      studentName: scheduleData.studentName,
      studentContact: scheduleData.studentContact,
      status: 'scheduled',
      notes: scheduleData.notes
    }

    setSchedules(prev => [...prev, newSchedule])
    
    // Reset form
    setShowScheduleForm(false)
    setSelectedTimeSlot(null)
    setScheduleData({
      subject: '',
      classLevel: '',
      studentName: '',
      studentContact: '',
      notes: ''
    })
    
    alert('Schedule created successfully!')
  }

  const handleAddTutor = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const newTutor: Tutor = {
      id: Date.now().toString(),
      name: newTutorData.name,
      subjects: newTutorData.subjects,
      classes: newTutorData.classes,
      experience: newTutorData.experience,
      rating: 0,
      hourlyRate: parseFloat(newTutorData.hourlyRate),
      timezone: newTutorData.timezone,
      status: newTutorData.status
    }

    // In real app, this would be an API call
    mockTutors.push(newTutor)
    
    setShowAddTutorForm(false)
    setNewTutorData({
      name: '',
      subjects: [],
      classes: [],
      experience: '',
      hourlyRate: '',
      timezone: '',
      status: 'active'
    })
    
    alert('Tutor added successfully!')
  }

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const days = []
    
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i))
    }
    
    return days
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    })
  }

  const isToday = (date: Date) => {
    const today = new Date()
    return date.toDateString() === today.toDateString()
  }

  const isSelected = (date: Date) => {
    return selectedDate.toDateString() === date.toDateString()
  }

  const getScheduleForSlot = (tutorId: string, date: string, time: string) => {
    return schedules.find(s => 
      s.tutorId === tutorId && 
      s.date === date && 
      s.startTime === time
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <Link href="/" className="flex items-center text-gray-500 hover:text-gray-900">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Home
            </Link>
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-blue-600" />
              <h1 className="ml-2 text-2xl font-bold text-gray-900">Tutor Management</h1>
            </div>
            <button
              onClick={() => setShowAddTutorForm(true)}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Tutor
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Manage Tutor Schedules</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
              <select
                value={filterSubject}
                onChange={(e) => setFilterSubject(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Subjects</option>
                {subjects.map(subject => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Class Level</label>
              <select
                value={filterClass}
                onChange={(e) => setFilterClass(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Classes</option>
                {classes.map(classLevel => (
                  <option key={classLevel} value={classLevel}>{classLevel}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="on_leave">On Leave</option>
              </select>
            </div>
            
            <div className="flex items-end">
              <button
                onClick={() => {
                  setFilterSubject('all')
                  setFilterClass('all')
                  setFilterStatus('all')
                }}
                className="w-full px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Tutors List */}
          <div className="lg:col-span-1">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Available Tutors</h2>
            <div className="space-y-4">
              {filteredTutors.map(tutor => (
                <div
                  key={tutor.id}
                  onClick={() => handleTutorSelect(tutor)}
                  className={`bg-white rounded-lg shadow p-4 cursor-pointer transition-all ${
                    selectedTutor?.id === tutor.id 
                      ? 'ring-2 ring-blue-500 border-blue-500' 
                      : 'hover:shadow-md'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Users className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-gray-900">{tutor.name}</h3>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          tutor.status === 'active' ? 'bg-green-100 text-green-800' :
                          tutor.status === 'inactive' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {tutor.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{tutor.experience} experience</p>
                      <div className="flex items-center mt-1">
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className={i < Math.floor(tutor.rating) ? 'text-yellow-400' : 'text-gray-300'}>
                              ★
                            </span>
                          ))}
                        </div>
                        <span className="text-sm text-gray-600 ml-1">({tutor.rating})</span>
                      </div>
                      <div className="mt-2">
                        <p className="text-sm text-gray-600">
                          <BookOpen className="inline h-4 w-4 mr-1" />
                          {tutor.subjects.join(', ')}
                        </p>
                        <p className="text-sm text-gray-600">
                          <GraduationCap className="inline h-4 w-4 mr-1" />
                          {tutor.classes.join(', ')}
                        </p>
                        <p className="text-sm font-medium text-green-600">
                          ${tutor.hourlyRate}/hour
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Calendar and Time Slots */}
          <div className="lg:col-span-2">
            {selectedTutor ? (
              <div className="space-y-6">
                {/* Selected Tutor Info */}
                <div className="bg-white rounded-lg shadow p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{selectedTutor.name}</h3>
                      <p className="text-sm text-gray-600">{selectedTutor.timezone} • ${selectedTutor.hourlyRate}/hour</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Rating</p>
                      <p className="text-lg font-semibold text-gray-900">{selectedTutor.rating}/5</p>
                    </div>
                  </div>
                </div>

                {/* Calendar */}
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Date</h3>
                  <div className="grid grid-cols-7 gap-1">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                      <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                        {day}
                      </div>
                    ))}
                    {getDaysInMonth(selectedDate).map((date, index) => (
                      <button
                        key={index}
                        onClick={() => handleDateSelect(date)}
                        className={`p-2 text-sm rounded-lg transition-colors ${
                          isToday(date)
                            ? 'bg-blue-100 text-blue-700 font-semibold'
                            : isSelected(date)
                            ? 'bg-blue-600 text-white'
                            : 'hover:bg-gray-100'
                        }`}
                      >
                        {date.getDate()}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Time Slots */}
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Schedule for {formatDate(selectedDate)}
                    </h3>
                    <button
                      onClick={() => setShowScheduleForm(true)}
                      disabled={!selectedTimeSlot}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Plus className="h-4 w-4 mr-2 inline" />
                      Schedule Session
                    </button>
                  </div>
                  <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
                    {generateTimeSlots(selectedDate, selectedTutor).map(slot => {
                      const schedule = getScheduleForSlot(selectedTutor.id, selectedDate.toISOString().split('T')[0], slot.startTime)
                      return (
                        <div
                          key={slot.id}
                          onClick={() => handleTimeSlotSelect(slot)}
                          className={`p-3 text-sm rounded-lg transition-colors cursor-pointer ${
                            schedule
                              ? 'bg-blue-100 text-blue-700'
                              : !slot.isAvailable
                              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                              : selectedTimeSlot?.id === slot.id
                              ? 'bg-green-600 text-white'
                              : 'bg-green-100 text-green-700 hover:bg-green-200'
                          }`}
                        >
                          <div className="text-center">
                            <div className="font-medium">{slot.startTime}</div>
                            {schedule && (
                              <div className="text-xs mt-1">
                                <div className="font-semibold">{schedule.studentName}</div>
                                <div>{schedule.subject}</div>
                                <div>{schedule.classLevel}</div>
                              </div>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Today's Schedules */}
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Today's Schedules for {selectedTutor.name}
                  </h3>
                  <div className="space-y-3">
                    {schedules
                      .filter(s => s.tutorId === selectedTutor.id && s.date === selectedDate.toISOString().split('T')[0])
                      .map(schedule => (
                        <div key={schedule.id} className="border rounded-lg p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-medium">{schedule.studentName}</div>
                              <div className="text-sm text-gray-600">
                                {schedule.startTime} - {schedule.endTime} • {schedule.subject} • {schedule.classLevel}
                              </div>
                              <div className="text-sm text-gray-500">{schedule.studentContact}</div>
                            </div>
                            <div className="flex space-x-2">
                              <button className="text-blue-600 hover:text-blue-800">
                                <Edit className="h-4 w-4" />
                              </button>
                              <button className="text-red-600 hover:text-red-800">
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    {schedules.filter(s => s.tutorId === selectedTutor.id && s.date === selectedDate.toISOString().split('T')[0]).length === 0 && (
                      <p className="text-gray-500 text-center py-4">No schedules for today</p>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow p-8 text-center">
                <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Select a Tutor</h3>
                <p className="text-gray-600">Choose a tutor from the list to manage their schedule</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Schedule Form Modal */}
      {showScheduleForm && selectedTutor && selectedTimeSlot && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-1/2 lg:w-1/3 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Schedule Session</h3>
                <button
                  onClick={() => setShowScheduleForm(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle className="h-6 w-6" />
                </button>
              </div>
              
              <form onSubmit={handleScheduleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Subject *
                  </label>
                  <select
                    required
                    value={scheduleData.subject}
                    onChange={(e) => setScheduleData({...scheduleData, subject: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select subject</option>
                    {selectedTutor.subjects.map(subject => (
                      <option key={subject} value={subject}>{subject}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Class Level *
                  </label>
                  <select
                    required
                    value={scheduleData.classLevel}
                    onChange={(e) => setScheduleData({...scheduleData, classLevel: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select class level</option>
                    {selectedTutor.classes.map(classLevel => (
                      <option key={classLevel} value={classLevel}>{classLevel}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Student Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={scheduleData.studentName}
                    onChange={(e) => setScheduleData({...scheduleData, studentName: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Student Contact *
                  </label>
                  <input
                    type="text"
                    required
                    value={scheduleData.studentContact}
                    onChange={(e) => setScheduleData({...scheduleData, studentContact: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Phone or email"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Notes (Optional)
                  </label>
                  <textarea
                    value={scheduleData.notes}
                    onChange={(e) => setScheduleData({...scheduleData, notes: e.target.value})}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Any special instructions or notes..."
                  />
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Session Details</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Tutor:</span>
                      <span>{selectedTutor.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Date:</span>
                      <span>{formatDate(selectedDate)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Time:</span>
                      <span>{selectedTimeSlot.startTime} - {selectedTimeSlot.endTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Rate:</span>
                      <span>${selectedTutor.hourlyRate}/hour</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowScheduleForm(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Schedule Session
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Add Tutor Form Modal */}
      {showAddTutorForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-1/2 lg:w-1/3 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Add New Tutor</h3>
                <button
                  onClick={() => setShowAddTutorForm(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle className="h-6 w-6" />
                </button>
              </div>
              
              <form onSubmit={handleAddTutor} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={newTutorData.name}
                    onChange={(e) => setNewTutorData({...newTutorData, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Subjects *
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {subjects.map(subject => (
                      <label key={subject} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={newTutorData.subjects.includes(subject)}
                          onChange={(e) => {
                            const newSubjects = e.target.checked
                              ? [...newTutorData.subjects, subject]
                              : newTutorData.subjects.filter(s => s !== subject)
                            setNewTutorData({...newTutorData, subjects: newSubjects})
                          }}
                          className="mr-2"
                        />
                        <span className="text-sm">{subject}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Classes *
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {classes.map(classLevel => (
                      <label key={classLevel} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={newTutorData.classes.includes(classLevel)}
                          onChange={(e) => {
                            const newClasses = e.target.checked
                              ? [...newTutorData.classes, classLevel]
                              : newTutorData.classes.filter(c => c !== classLevel)
                            setNewTutorData({...newTutorData, classes: newClasses})
                          }}
                          className="mr-2"
                        />
                        <span className="text-sm">{classLevel}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Experience *
                  </label>
                  <select
                    required
                    value={newTutorData.experience}
                    onChange={(e) => setNewTutorData({...newTutorData, experience: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select experience</option>
                    <option value="0-1 years">0-1 years</option>
                    <option value="1-3 years">1-3 years</option>
                    <option value="3-5 years">3-5 years</option>
                    <option value="5-10 years">5-10 years</option>
                    <option value="10+ years">10+ years</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Hourly Rate *
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    step="0.01"
                    value={newTutorData.hourlyRate}
                    onChange={(e) => setNewTutorData({...newTutorData, hourlyRate: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="0.00"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Timezone *
                  </label>
                  <select
                    required
                    value={newTutorData.timezone}
                    onChange={(e) => setNewTutorData({...newTutorData, timezone: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select timezone</option>
                    <option value="IST">IST (India)</option>
                    <option value="EST">EST (Eastern US)</option>
                    <option value="PST">PST (Pacific US)</option>
                    <option value="GMT">GMT (UK)</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status *
                  </label>
                  <select
                    required
                    value={newTutorData.status}
                    onChange={(e) => setNewTutorData({...newTutorData, status: e.target.value as 'active' | 'inactive' | 'on_leave'})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="on_leave">On Leave</option>
                  </select>
                </div>
                
                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowAddTutorForm(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Add Tutor
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}