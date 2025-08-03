import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for our database
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
  category: string
  created_at: string
}

export interface Class {
  id: number
  name: string
  level: string
  created_at: string
}