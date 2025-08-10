import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Check if environment variables are properly set
const isSupabaseConfigured = supabaseUrl && supabaseAnonKey && 
  supabaseUrl !== 'your_supabase_project_url' && 
  supabaseAnonKey !== 'your_supabase_anon_key'

export const supabase = isSupabaseConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

// Mock data for development when Supabase is not configured
export const mockData = {
  applications: [],
  tutors: [
    {
      id: '1',
      name: 'Dr. Sarah Johnson',
      subjects: ['Mathematics', 'Physics'],
      classes: ['Class 9-10', 'Class 11-12'],
      experience: '5-10 years',
      rating: 4.8,
      hourly_rate: 45,
      timezone: 'EST',
      status: 'active',
      avatar_url: null,
      bio: 'Experienced mathematics and physics tutor with a passion for teaching.',
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '2',
      name: 'Prof. Michael Chen',
      subjects: ['Computer Science', 'Mathematics'],
      classes: ['Class 11-12', 'Undergraduate'],
      experience: '3-5 years',
      rating: 4.9,
      hourly_rate: 50,
      timezone: 'PST',
      status: 'active',
      avatar_url: null,
      bio: 'Computer science expert with strong mathematical background.',
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    }
  ],
  schedules: []
}

// Database Types
export interface Application {
  id: string
  personal_info: {
    firstName: string
    lastName: string
    email: string
    phone: string
    address: string
  }
  education: {
    degree: string
    institution: string
    graduationYear: string
    gpa?: string
  }
  experience: {
    yearsOfExperience: string
    previousInstitutions: string[]
    certifications: string[]
  }
  availability: {
    preferredSubjects: string[]
    preferredClasses: string[]
    availableHours: string[]
    timezone: string
  }
  additional: {
    whyJoin: string
    teachingPhilosophy: string
    references: string[]
  }
  status: 'pending' | 'reviewed' | 'approved' | 'rejected'
  applied_at: string
  updated_at: string
}

export interface Tutor {
  id: string
  name: string
  subjects: string[]
  classes: string[]
  experience: string
  rating: number
  hourly_rate: number
  timezone: string
  status: 'active' | 'inactive' | 'on_leave'
  avatar_url?: string
  bio?: string
  created_at: string
  updated_at: string
}

export interface Schedule {
  id: string
  tutor_id: string
  date: string
  start_time: string
  end_time: string
  subject: string
  class_level: string
  student_name: string
  student_contact: string
  status: 'scheduled' | 'completed' | 'cancelled'
  notes?: string
  created_at: string
  updated_at: string
}

export interface Subject {
  id: number
  name: string
  category?: string
  created_at: string
}

export interface Class {
  id: number
  name: string
  level?: string
  created_at: string
}