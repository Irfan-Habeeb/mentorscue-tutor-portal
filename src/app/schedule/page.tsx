'use client'

import { useState, useEffect } from 'react'
import { GraduationCap, Calendar, Clock, Users, MapPin, BookOpen, ArrowLeft, CheckCircle, XCircle } from 'lucide-react'
import Link from 'next/link'

interface Tutor {
  id: string
  name: string
  subjects: string[]
  classes: string[]
  experience: string
  rating: number
  hourlyRate: number
  avatar: string
  timezone: string
}

interface TimeSlot {
  id: string
  startTime: string
  endTime: string
  isAvailable: boolean
  isBooked: boolean
  studentName?: string
  subject?: string
}

interface Booking {
  id: string
  tutorId: string
  studentName: string
  studentEmail: string
  subject: string
  date: string
  startTime: string
  endTime: string
  duration: number
  totalPrice: number
  status: 'pending' | 'confirmed' | 'cancelled'
  notes?: string
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
    avatar: '/api/placeholder/60/60',
    timezone: 'EST'
  },
  {
    id: '2',
    name: 'Prof. Michael Chen',
    subjects: ['Computer Science', 'Mathematics'],
    classes: ['Class 11-12', 'Undergraduate'],
    experience: '3-5 years',
    rating: 4.9,
    hourlyRate: 50,
    avatar: '/api/placeholder/60/60',
    timezone: 'PST'
  },
  {
    id: '3',
    name: 'Ms. Emily Davis',
    subjects: ['English', 'Literature'],
    classes: ['Class 6-8', 'Class 9-10'],
    experience: '1-3 years',
    rating: 4.7,
    hourlyRate: 35,
    avatar: '/api/placeholder/60/60',
    timezone: 'EST'
  }
]

const timeSlots = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
  '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
  '18:00', '18:30', '19:00', '19:30', '20:00', '20:30'
]

export default function SchedulePage() {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedTutor, setSelectedTutor] = useState<Tutor | null>(null)
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(null)
  const [showBookingForm, setShowBookingForm] = useState(false)
  const [bookingData, setBookingData] = useState({
    studentName: '',
    studentEmail: '',
    subject: '',
    duration: 1,
    notes: ''
  })
  const [filterSubject, setFilterSubject] = useState('all')
  const [filterClass, setFilterClass] = useState('all')

  const subjects = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'Computer Science']
  const classes = ['Class 1-5', 'Class 6-8', 'Class 9-10', 'Class 11-12', 'Undergraduate']

  const filteredTutors = mockTutors.filter(tutor => {
    const matchesSubject = filterSubject === 'all' || tutor.subjects.includes(filterSubject)
    const matchesClass = filterClass === 'all' || tutor.classes.includes(filterClass)
    return matchesSubject && matchesClass
  })

  const generateTimeSlots = (date: Date, tutor: Tutor): TimeSlot[] => {
    return timeSlots.map((time, index) => ({
      id: `${date.toISOString()}-${time}-${tutor.id}`,
      startTime: time,
      endTime: timeSlots[index + 1] || '21:00',
      isAvailable: Math.random() > 0.3, // 70% availability for demo
      isBooked: Math.random() > 0.8, // 20% booked for demo
      studentName: Math.random() > 0.8 ? 'John Doe' : undefined,
      subject: Math.random() > 0.8 ? 'Mathematics' : undefined
    }))
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
    if (slot.isAvailable && !slot.isBooked) {
      setSelectedTimeSlot(slot)
    }
  }

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!selectedTutor || !selectedTimeSlot) return

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tutorId: selectedTutor.id,
          studentName: bookingData.studentName,
          studentEmail: bookingData.studentEmail,
          subject: bookingData.subject,
          date: selectedDate.toISOString().split('T')[0],
          startTime: selectedTimeSlot.startTime,
          endTime: selectedTimeSlot.endTime,
          duration: bookingData.duration,
          totalPrice: selectedTutor.hourlyRate * bookingData.duration,
          notes: bookingData.notes
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to submit booking')
      }

      // Reset form
      setShowBookingForm(false)
      setSelectedTimeSlot(null)
      setBookingData({
        studentName: '',
        studentEmail: '',
        subject: '',
        duration: 1,
        notes: ''
      })
      
      alert('Booking submitted successfully! You will receive a confirmation email shortly.')
    } catch (error) {
      console.error('Error submitting booking:', error)
      alert('Failed to submit booking. Please try again.')
    }
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
              <h1 className="ml-2 text-2xl font-bold text-gray-900">Schedule Sessions</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Find Your Perfect Tutor</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
            
            <div className="flex items-end">
              <button
                onClick={() => {
                  setFilterSubject('all')
                  setFilterClass('all')
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
                      <h3 className="font-semibold text-gray-900">{tutor.name}</h3>
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
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Available Times for {formatDate(selectedDate)}
                  </h3>
                  <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
                    {generateTimeSlots(selectedDate, selectedTutor).map(slot => (
                      <button
                        key={slot.id}
                        onClick={() => handleTimeSlotSelect(slot)}
                        disabled={!slot.isAvailable || slot.isBooked}
                        className={`p-3 text-sm rounded-lg transition-colors ${
                          slot.isBooked
                            ? 'bg-red-100 text-red-700 cursor-not-allowed'
                            : !slot.isAvailable
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : selectedTimeSlot?.id === slot.id
                            ? 'bg-blue-600 text-white'
                            : 'bg-green-100 text-green-700 hover:bg-green-200'
                        }`}
                      >
                        {slot.startTime}
                        {slot.isBooked && (
                          <div className="text-xs mt-1">Booked</div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Booking Button */}
                {selectedTimeSlot && (
                  <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Session Details</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Tutor:</span>
                        <span className="font-medium">{selectedTutor.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Date:</span>
                        <span className="font-medium">{formatDate(selectedDate)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Time:</span>
                        <span className="font-medium">{selectedTimeSlot.startTime} - {selectedTimeSlot.endTime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Rate:</span>
                        <span className="font-medium">${selectedTutor.hourlyRate}/hour</span>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowBookingForm(true)}
                      className="w-full mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Book Session
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow p-8 text-center">
                <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Select a Tutor</h3>
                <p className="text-gray-600">Choose a tutor from the list to view their availability</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Booking Form Modal */}
      {showBookingForm && selectedTutor && selectedTimeSlot && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-1/2 lg:w-1/3 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Book Session</h3>
                <button
                  onClick={() => setShowBookingForm(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle className="h-6 w-6" />
                </button>
              </div>
              
              <form onSubmit={handleBooking} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Student Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={bookingData.studentName}
                    onChange={(e) => setBookingData({...bookingData, studentName: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={bookingData.studentEmail}
                    onChange={(e) => setBookingData({...bookingData, studentEmail: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Subject *
                  </label>
                  <select
                    required
                    value={bookingData.subject}
                    onChange={(e) => setBookingData({...bookingData, subject: e.target.value})}
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
                    Duration (hours) *
                  </label>
                  <select
                    required
                    value={bookingData.duration}
                    onChange={(e) => setBookingData({...bookingData, duration: parseInt(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value={1}>1 hour</option>
                    <option value={1.5}>1.5 hours</option>
                    <option value={2}>2 hours</option>
                    <option value={2.5}>2.5 hours</option>
                    <option value={3}>3 hours</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Notes (Optional)
                  </label>
                  <textarea
                    value={bookingData.notes}
                    onChange={(e) => setBookingData({...bookingData, notes: e.target.value})}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Any specific topics or requirements..."
                  />
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Session Summary</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Duration:</span>
                      <span>{bookingData.duration} hour(s)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Rate:</span>
                      <span>${selectedTutor.hourlyRate}/hour</span>
                    </div>
                    <div className="flex justify-between font-medium">
                      <span>Total:</span>
                      <span>${selectedTutor.hourlyRate * bookingData.duration}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowBookingForm(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Confirm Booking
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