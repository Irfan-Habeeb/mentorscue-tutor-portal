import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const isSupabaseConfigured = supabaseUrl && supabaseAnonKey &&
  supabaseUrl !== 'your_supabase_project_url' &&
  supabaseAnonKey !== 'your_supabase_anon_key'

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

export const mockData: {
  applications: Application[]
  subjects: Subject[]
  classes: Class[]
} = {
  applications: [],
  subjects: [
    { id: 1, name: 'Mathematics', category: 'Science', created_at: '2024-01-01T00:00:00Z' },
    { id: 2, name: 'Physics', category: 'Science', created_at: '2024-01-01T00:00:00Z' },
    { id: 3, name: 'Chemistry', category: 'Science', created_at: '2024-01-01T00:00:00Z' },
    { id: 4, name: 'Biology', category: 'Science', created_at: '2024-01-01T00:00:00Z' },
    { id: 5, name: 'English', category: 'Language', created_at: '2024-01-01T00:00:00Z' },
    { id: 6, name: 'History', category: 'Social Studies', created_at: '2024-01-01T00:00:00Z' },
    { id: 7, name: 'Computer Science', category: 'Technology', created_at: '2024-01-01T00:00:00Z' }
  ],
  classes: [
    { id: 1, name: 'Class 1-5', level: 'Primary', created_at: '2024-01-01T00:00:00Z' },
    { id: 2, name: 'Class 6-8', level: 'Middle', created_at: '2024-01-01T00:00:00Z' },
    { id: 3, name: 'Class 9-10', level: 'Secondary', created_at: '2024-01-01T00:00:00Z' },
    { id: 4, name: 'Class 11-12', level: 'Higher Secondary', created_at: '2024-01-01T00:00:00Z' },
    { id: 5, name: 'Undergraduate', level: 'University', created_at: '2024-01-01T00:00:00Z' }
  ]
}

// Database Types
export interface Application {
  id: string
  personal_info: {
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
  status: 'pending' | 'reviewed' | 'approved' | 'rejected'
  applied_at: string
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