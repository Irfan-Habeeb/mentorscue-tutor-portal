'use client'

import { useState } from 'react'
import { GraduationCap, ArrowLeft, CheckCircle } from 'lucide-react'
import Link from 'next/link'

interface ApplicationForm {
  personalInfo: {
    firstName: string
    lastName: string
    email: string
    phone: string
    dateOfBirth: string
  }
  education: {
    degree: string
    institution: string
    graduationYear: string
    gpa: string
  }
  experience: {
    yearsOfTeaching: string
    subjects: string[]
    classes: string[]
    previousInstitutions: string
  }
  availability: {
    preferredHours: string
    availableDays: string[]
    timeZone: string
  }
  additional: {
    whyJoin: string
    specializations: string
    references: string
  }
}

const subjects = [
  'Mathematics', 'Physics', 'Chemistry', 'Biology', 'English',
  'History', 'Geography', 'Computer Science', 'Economics',
  'Literature', 'Art', 'Music', 'Physical Education'
]

const classes = [
  'Class 1-5', 'Class 6-8', 'Class 9-10', 'Class 11-12',
  'Undergraduate', 'Graduate', 'Professional'
]

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

export default function ApplyPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  
  const [formData, setFormData] = useState<ApplicationForm>({
    personalInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      dateOfBirth: ''
    },
    education: {
      degree: '',
      institution: '',
      graduationYear: '',
      gpa: ''
    },
    experience: {
      yearsOfTeaching: '',
      subjects: [],
      classes: [],
      previousInstitutions: ''
    },
    availability: {
      preferredHours: '',
      availableDays: [],
      timeZone: ''
    },
    additional: {
      whyJoin: '',
      specializations: '',
      references: ''
    }
  })

  const updateFormData = (section: keyof ApplicationForm, field: string, value: string | string[]) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Failed to submit application')
      }

      setIsSubmitting(false)
      setIsSubmitted(true)
    } catch (error) {
      console.error('Error submitting application:', error)
      setIsSubmitting(false)
      alert('Failed to submit application. Please try again.')
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-2xl mx-auto px-4 py-16">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Application Submitted!</h1>
            <p className="text-gray-600 mb-6">
              Thank you for your application. We will review your information and contact you within 3-5 business days.
            </p>
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <Link href="/" className="flex items-center text-gray-500 hover:text-gray-900">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Home
            </Link>
            <div className="flex items-center">
              <GraduationCap className="h-8 w-8 text-blue-600" />
              <h1 className="ml-2 text-2xl font-bold text-gray-900">Mentorscue</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Tutor Application</h2>
            <span className="text-sm text-gray-500">Step {currentStep} of 5</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / 5) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8">
          {currentStep === 1 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Personal Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.personalInfo.firstName}
                    onChange={(e) => updateFormData('personalInfo', 'firstName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.personalInfo.lastName}
                    onChange={(e) => updateFormData('personalInfo', 'lastName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.personalInfo.email}
                    onChange={(e) => updateFormData('personalInfo', 'email', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.personalInfo.phone}
                    onChange={(e) => updateFormData('personalInfo', 'phone', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date of Birth *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.personalInfo.dateOfBirth}
                    onChange={(e) => updateFormData('personalInfo', 'dateOfBirth', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Education</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Degree/Certification *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.education.degree}
                    onChange={(e) => updateFormData('education', 'degree', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Institution *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.education.institution}
                    onChange={(e) => updateFormData('education', 'institution', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Graduation Year *
                  </label>
                  <input
                    type="number"
                    required
                    min="1950"
                    max="2030"
                    value={formData.education.graduationYear}
                    onChange={(e) => updateFormData('education', 'graduationYear', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    GPA (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.education.gpa}
                    onChange={(e) => updateFormData('education', 'gpa', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Teaching Experience</h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Years of Teaching Experience *
                  </label>
                  <select
                    required
                    value={formData.experience.yearsOfTeaching}
                    onChange={(e) => updateFormData('experience', 'yearsOfTeaching', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select years</option>
                    <option value="0-1">0-1 years</option>
                    <option value="1-3">1-3 years</option>
                    <option value="3-5">3-5 years</option>
                    <option value="5-10">5-10 years</option>
                    <option value="10+">10+ years</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subjects You Can Teach *
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {subjects.map((subject) => (
                      <label key={subject} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.experience.subjects.includes(subject)}
                          onChange={(e) => {
                            const newSubjects = e.target.checked
                              ? [...formData.experience.subjects, subject]
                              : formData.experience.subjects.filter(s => s !== subject)
                            updateFormData('experience', 'subjects', newSubjects)
                          }}
                          className="mr-2"
                        />
                        <span className="text-sm">{subject}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Classes You Can Teach *
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {classes.map((classLevel) => (
                      <label key={classLevel} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.experience.classes.includes(classLevel)}
                          onChange={(e) => {
                            const newClasses = e.target.checked
                              ? [...formData.experience.classes, classLevel]
                              : formData.experience.classes.filter(c => c !== classLevel)
                            updateFormData('experience', 'classes', newClasses)
                          }}
                          className="mr-2"
                        />
                        <span className="text-sm">{classLevel}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Previous Teaching Institutions
                  </label>
                  <textarea
                    value={formData.experience.previousInstitutions}
                    onChange={(e) => updateFormData('experience', 'previousInstitutions', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="List any previous institutions where you've taught..."
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Availability</h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Hours per Week *
                  </label>
                  <select
                    required
                    value={formData.availability.preferredHours}
                    onChange={(e) => updateFormData('availability', 'preferredHours', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select hours</option>
                    <option value="5-10">5-10 hours</option>
                    <option value="10-20">10-20 hours</option>
                    <option value="20-30">20-30 hours</option>
                    <option value="30+">30+ hours</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Available Days *
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {days.map((day) => (
                      <label key={day} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.availability.availableDays.includes(day)}
                          onChange={(e) => {
                            const newDays = e.target.checked
                              ? [...formData.availability.availableDays, day]
                              : formData.availability.availableDays.filter(d => d !== day)
                            updateFormData('availability', 'availableDays', newDays)
                          }}
                          className="mr-2"
                        />
                        <span className="text-sm">{day}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Time Zone *
                  </label>
                  <select
                    required
                    value={formData.availability.timeZone}
                    onChange={(e) => updateFormData('availability', 'timeZone', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select timezone</option>
                    <option value="IST">IST (India)</option>
                    <option value="EST">EST (Eastern US)</option>
                    <option value="PST">PST (Pacific US)</option>
                    <option value="GMT">GMT (UK)</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {currentStep === 5 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Additional Information</h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Why do you want to join Mentorscue? *
                  </label>
                  <textarea
                    required
                    value={formData.additional.whyJoin}
                    onChange={(e) => updateFormData('additional', 'whyJoin', e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Tell us about your motivation to join our team..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Specializations or Areas of Expertise
                  </label>
                  <textarea
                    value={formData.additional.specializations}
                    onChange={(e) => updateFormData('additional', 'specializations', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Any specific areas you specialize in..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    References (Optional)
                  </label>
                  <textarea
                    value={formData.additional.references}
                    onChange={(e) => updateFormData('additional', 'references', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Contact information for professional references..."
                  />
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={() => setCurrentStep(currentStep - 1)}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Previous
              </button>
            )}
            
            {currentStep < 5 ? (
              <button
                type="button"
                onClick={() => setCurrentStep(currentStep + 1)}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 ml-auto"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 ml-auto"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}