import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

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